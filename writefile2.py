import io
import csv
import sys
import time

i = 0;
f = open('preludeinc.txt','r+b') 
lines = f.read().splitlines() # get all notes
file = open('notes.txt','r+b')
for line in lines:
	currentNote = lines[i]
	#time.sleep(1) # delays for 3 seconds
	file.write(currentNote+'\n') # write current note to text file
	print(currentNote+'\n')
	i=i+1
file.close()	



	#import preludeinc.txt
	#txt_file = preludeinc.txt

	#list1 = txt_file.readlines()

	#ist1 = txt_file.readlines()
	#print list1
#with io.FileIO("notes.txt", "w") as file:
#    file.write(lines)