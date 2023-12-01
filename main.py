import math
import os
import cv2
import cvzone
from cvzone.PoseModule import PoseDetector

cap = cv2.VideoCapture(0)
detector = PoseDetector()
shirtsFolderPath = "static/images"
listShirts = os.listdir(shirtsFolderPath)
fixedRatio = 292/190
shirtRatioHeightWidth = 546/440
imageNumber = 0
imgButtonRight = cv2.imread("Resources/next.png", cv2.IMREAD_UNCHANGED)
imgButtonLeft = cv2.flip(imgButtonRight, 1)
counterRight = 0
counterLeft = 0
selectionSpeed = 20

# Create a named window and set it to fullscreen
cv2.namedWindow("Image", cv2.WINDOW_NORMAL)
cv2.setWindowProperty("Image", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

while True:
    success, img = cap.read()
    img = detector.findPose(img, draw=False)
    lmList, bboxInfo = detector.findPosition(img, bboxWithHands=False, draw=False)
    
    if lmList:
        lm11 = lmList[11][0:2]
        lm12 = lmList[12][0:2]
        lm23 = lmList[23][0:2]  # Assuming lmList[23] corresponds to the right shoulder
        lm24 = lmList[24][0:2]  # Assuming lmList[24] corresponds to the left shoulder

        # Calculate the distance between the shoulders to estimate the width of the person
        person_width = math.dist(lm23, lm24)

        imgShirt = cv2.imread(os.path.join(shirtsFolderPath, listShirts[imageNumber]), cv2.IMREAD_UNCHANGED)

        widthOfShirt = int((lm11[0] - lm12[0]) * fixedRatio)

        if widthOfShirt > 0:
            imgShirt = cv2.resize(imgShirt, (widthOfShirt, int(widthOfShirt * shirtRatioHeightWidth)))
            currentScale = (lm11[0] - lm12[0]) / 190
            offset = int(44 * currentScale), int(48 * currentScale)

            try:
                img = cvzone.overlayPNG(img, imgShirt, (lm12[0] - offset[0], lm12[1] - offset[1]))
            except:
                pass

        img = cvzone.overlayPNG(img, imgButtonLeft, (40, 200))
        img = cvzone.overlayPNG(img, imgButtonRight, (530, 200))

        # Determine the shirt size based on the estimated person width
        if person_width < 100:
            shirt_size = "Small"
        elif 100 <= person_width < 150:
            shirt_size = "Medium"
        else:
            shirt_size = "Large"

        # Display the shirt size on the window
        cv2.putText(img, f"Shirt Size: {shirt_size}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        print("Shirt Size:", shirt_size)

        if lmList[16][1] < 300:
            counterRight += 1
            cv2.ellipse(img, (75, 236), (33, 33), 0, 0, counterRight * selectionSpeed, (0, 255, 0), 7)
            if counterRight * selectionSpeed > 360:
                counterRight = 0
                if imageNumber < len(listShirts)-1:
                    imageNumber += 1
        elif lmList[15][1] < 300:
            counterLeft += 1
            cv2.ellipse(img, (566, 236), (33, 33), 0, 0, counterLeft * selectionSpeed, (0, 255, 0), 7)
            if counterLeft * selectionSpeed > 360:
                counterLeft = 0
                if imageNumber > 0:
                    imageNumber -= 1
        else:
            counterRight = 0
            counterLeft = 0

    cv2.imshow("Image", img)
    cv2.waitKey(1)
