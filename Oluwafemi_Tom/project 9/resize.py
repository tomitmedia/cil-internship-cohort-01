#Simple function to copy and resize a jpg file     ###

#Import required Image library
from PIL import Image
import shutil


#function to copy image
def CopyImage(path):
    shutil.copy(path,"originalIMG.jpg")

#function to resize imaage
def ResizeIMAGE(path):
    img = Image.open(path)
    resized_im = img.resize((round(img.size[0]*0.5), round(img.size[1]*0.5)))
    img.show()
    resized_im.show()
    resized_im.save('resizedIMG.jpg')

path = input("Input Image Path: ")
CopyImage(path)
print('Image Copied Sucessfully !!')
ResizeIMAGE(path)
print(" Image Resized ")






# def image_resize(image,width,height):
#     from PIL import Image
#     img = Image.open(image)
#     resized_img = img.resize((width,height))
#     resized_img.save("resized_image.jpg")
# image_resize('rtg.jpeg',70,70) 