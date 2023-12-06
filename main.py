import math
import os
import cv2
import cvzone
from cvzone.PoseModule import PoseDetector

#cap = cv2.VideoCapture("Resources/Videos/output.mp4")
cap = cv2.VideoCapture(0)
detector = PoseDetector()
shirtsFolderPath = "backend/uploads"
listShirts = os.listdir(shirtsFolderPath)
fixedRatio = 292/190
shirtRatioHeightWidth = 546/440
imageNumber = 0
imgButtonRight = cv2.imread("Resources/next.png", cv2.IMREAD_UNCHANGED)
imgButtonLeft = cv2.flip(imgButtonRight, 1)
counterRight = 0
counterLeft = 0
selectionSpeed = 20
shirt_size = ""

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
        person_width = int(math.dist(lm11, lm12))
        person_length = int(math.dist(lm11, lm23))
        person_width_inch = 0;
        person_length_inch = 0;
        # person_width_inch = int(math.dist(lm11, lm12)) - 105
        # person_length_inch = int(math.dist(lm11, lm23)) - 161

        print(int(math.dist(lm11, lm12)))
        print(int(math.dist(lm11, lm23)))
        # print(person_width, person_length)

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
        if 123 > person_width or 184 > person_length:
            shirt_size = "Extra Small"
        elif 128 > person_width or 187 > person_length:
            shirt_size = "Small"
        elif 133 > person_width or 190 > person_length:
            shirt_size = "Medium"
        elif 138 > person_width or 193 > person_length:
            shirt_size = "Large"
        elif 143 > person_width or 196 > person_length:
            shirt_size = "XL"
        elif 148 > person_width or 197 > person_length:
            shirt_size = "XXL"
        else:
            shirt_size = "Getting Shirt Size..."
            person_width = ""
            person_length = ""
            pass

        # Display the shirt size on the window
        cv2.putText(img, f"Shirt Size: {shirt_size}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

        cv2.putText(img, f"Shirt Width: {person_width_inch} inch", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

        cv2.putText(img, f"Shirt Length: {person_length_inch} inch", (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

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
