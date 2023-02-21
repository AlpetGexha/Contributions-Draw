import os
from datetime import date

run_time = 1.527765

datas = []

# check if file art.txt exsist
if not os.path.isfile("art.txt"):
    print("art.txt not found")
    exit()

# get datas form art.txt split with '),' but add ')' again
with open("art.txt", "r") as file:
    for line in file:
        for data in line.split("),"):
            datas.append(data + ")")

#if last element is '\n'
if datas[-1] == "\n"
    datas.pop()

# print(datas)
# print('This process will take round: ',"{:.2f}".format((run_time * len(datas))) ,' seconds')

for data in datas:
    # string to datatime
    year, month, day = map(int, data[5:-1].split(","))
    date_obj  = date(year=year, month=month, day=day)
    s = date_obj .strftime("%c") + " +0200"
    # Fri Jul 29 01:47:48 2022 +0200

    with open("data.txt", "a") as file:
        file.write(f"{date_obj } <- this is going to make a good ARTs!!\n")
    os.system("git add data.txt")
    os.system('git commit --date="' + s + '" -m "NOW! This is ART"')

os.system("git push")