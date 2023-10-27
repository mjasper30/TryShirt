import cv2

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter('output.mp4', fourcc, 20.0, (640, 480))

# Create a VideoCapture object
cap = cv2.VideoCapture(0)  # 0 represents the first connected camera

# Check if the camera is opened successfully
if not cap.isOpened():
    print("Error opening video stream or file")

# Record video and store it
while cap.isOpened():
    ret, frame = cap.read()
    if ret:
        # Write the frame into the file 'output.mp4'
        out.write(frame)
        # Display the resulting frame
        cv2.imshow('Frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    else:
        break

# Release everything if job is finished
cap.release()
out.release()
cv2.destroyAllWindows()
