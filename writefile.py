import io
import csv
import sys
import time

i = 0;
with open('preludeinc.txt') as f:
    lines = f.read().splitlines() # get all notes
	
	with io.FileIO("notes.txt", "w") as file:
		while i < len(lines):
		currentNote = lines[i]
		time.sleep(2) # delays for 3 seconds
		file.write(currentNote+'\n') # write current note to text file
		i = i+1





	#import preludeinc.txt
	#txt_file = preludeinc.txt

	#list1 = txt_file.readlines()

	#ist1 = txt_file.readlines()
	#print list1
#with io.FileIO("notes.txt", "w") as file:
#    file.write(lines)