import os

import cvzone
import cv2

from cvzone.PoseModule import PoseDetector

#cap = cv2.VideoCapture("Resources/Videos/1.mp4")
cap = cv2.VideoCapture(0)

# cap.set(3, 1280)  # Set the width of the frame
# cap.set(4, 720)  # Set the height of the frame
# print('Width:  ', cap.get(3))
# print('Height: ', cap.get(4))

detector = PoseDetector()

#shirtsFolderPath = "Resources/Shirts"
shirtsFolderPath = "static/images"
listShirts = os.listdir(shirtsFolderPath)
fixedRatio = 292/190 # width of shirt / width of point 11 to 12
shirtRatioHeightWidth = 546/440
imageNumber = 0
imgButtonRight = cv2.imread("Resources/next.png", cv2.IMREAD_UNCHANGED)
imgButtonLeft = cv2.flip(imgButtonRight, 1)
counterRight = 0
counterLeft = 0
selectionSpeed = 20

while True:
    success, img = cap.read()
    img = detector.findPose(img)
    lmList, bboxInfo = detector.findPosition(img, bboxWithHands=False, draw=False)
    if lmList:
        lm11 = lmList[11][0:2]
        lm12 = lmList[12][0:2]
        imgShirt = cv2.imread(os.path.join(shirtsFolderPath, listShirts[imageNumber]), cv2.IMREAD_UNCHANGED)

        widthOfShirt = int((lm11[0] - lm12[0]) * fixedRatio)

        if widthOfShirt > 0:
            imgShirt = cv2.resize(imgShirt, (widthOfShirt, int(widthOfShirt * shirtRatioHeightWidth)))
            currentScale = (lm11[0] - lm12[0])/190
            offset = int(44 * currentScale), int(48 * currentScale)

            try:
                img = cvzone.overlayPNG(img, imgShirt, (lm12[0]-offset[0], lm12[1]-offset[1]))
            except:
                pass

        img = cvzone.overlayPNG(img, imgButtonLeft, (40, 200))
        img = cvzone.overlayPNG(img, imgButtonRight, (530, 200))
        # print(lmList[16][1])

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



