 bash script in the theme of Kung Fury, utilizing git --date to commit 
# in the past. Effectivly hacking you back in time.

# Git commits are done on a once per-day psuedo-random coin flip basis from the
# chosen start date. Simply run this again if your desired commit density is
# less than desired.

# Watch this to get GUI movie References: https://youtu.be/bS5P_LAqiVg?t=9m52s

# Author: William Golembieski
# Email: BillGolembieski@projectu23.com

###############################################################################


###############################################################################

# Check if user is root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root. Try sudo bash timehack"
    exit
fi

###############################################################################

# Get OS
export platform='unknown'
export system_name=`uname`
if [[ "$system_name" == 'Linux' ]]; then
    platform='linux'
elif [[ "$system_name" == 'Darwin' ]]; then
    platform='osx'
fi

###############################################################################

# Load Complete
dialog --backtitle "GitHub Time Hacker" --infobox "LOAD COMPLETE." 3 20
sleep 1.25

###############################################################################

# Initializing Hack Sequence
export hacker_github_name=""
export hacker_email=""

exec 3>&1

dialog --separate-widget $'\n' --ok-label "Submit" \
    --backtitle "GitHub Time Hacker" \
    --title "INITIALIZING HACK SEQUENCE" \
    --form "\nEnter GitHub information:\nUse arrows or click to move" \
    12 50 0 \
    "Username:" 1 1 "$hacker_github_name" 1 10 20 0 \
    "Email:" 2 1 "$hacker_email" 2 10 40 0 \
2>&1 1>&3 |{
    read -r hacker_github_name
    read -r hacker_email
    exitcode=$?

    if [ "$exitcode" = 0 ]; then
        git config --global credential.helper cache
        git config --global credential.helper 'cache --timeout=600'
        git config --global user.email "$hacker_email"
        git config --global user.name "$hacker_github_name"
        git config --global push.default simple

    else
        echo
        echo "Aborted"
        exit
    fi
}
exec 3>&-
    
###############################################################################

# Initalizing Time Portal Screens
dialog --backtitle "GitHub Time Hacker" \
    --infobox "INITIALIZING TIME PORTAL." 3 31
sleep .9

dialog --backtitle "GitHub Time Hacker" \
    --infobox "INITIALIZING TIME PORTAL.." 3 31
sleep .9

dialog --backtitle "GitHub Time Hacker" \
    --infobox "INITIALIZING TIME PORTAL..." 3 31
sleep .9

###############################################################################

# Calender input
date_picked=$(dialog --stdout --title "TIME PORTAL" \
        --backtitle "GitHub Time Hacker" \
        --no-cancel \
        --date-format '%Y%m%d' \
        --calendar "\nSelect a date to hack\nback in time to:" \
        0 0)
                 
if [ "$date_picked" != "" ]; then

    if [ "$platform" = "linux" ]; then
        d1=$(date -d "00:00" +%s)
        d2=$(date -d $date_picked +%s)
    elif [ "$platform" = "osx" ]; then
        d1=$(date -j -f "%a %b %d %T %Z %Y" "`date`" "+%s")
        d2=$(date -j -f "%Y%m%d" "$date_picked" "+%s")
    else
        d1=$(date -d "00:00" +%s)
        d2=$(date -d $date_picked +%s)
    fi
    
    days_diff=$(( ($d1-$d2) / 86400 ))

else
    echo
    echo "Aborted"
    exit
fi

###############################################################################

# Committing
daysHacked=0
until [ "$daysHacked" -eq "$days_diff" ]
do
    FLIP=$(($RANDOM%10))
    
    if [ $FLIP -ge 2 ]; then
        if [ "$platform" = "linux" ]; then
        d=$(date -d "$date_picked + $daysHacked days" +%b" "%d" 00:00 "%Y)

        elif [ "$platform" = "osx" ]; then
    d=$(date -j -f "%a %b %d %T %Z %Y" "`date -v +"$daysHacked""d"`" \
    "+%b %d 00:00 %Y")

        else
    d=$(date -d "$date_picked + $daysHacked days" +%b" "%d" 00:00 "%Y)
    fi
    git commit --quiet --allow-empty --date="$d" -m "init commit"
    
    if [ $FLIP -ge 4 ]; then 
    git commit --quiet --allow-empty --date="$d" -m "minor fixes"
    git commit --quiet --allow-empty --date="$d" -m "WIP"
    
            if [ $FLIP -ge 8 ]; then
    git commit --quiet --allow-empty --date="$d" -m "optimise page load"
    git commit --quiet --allow-empty --date="$d" -m "nothing much added"
    git commit --quiet --allow-empty --date="$d" -m "minor changes"
    
                if [ $FLIP = 9 ]; then 
    git commit --quiet --allow-empty --date="$d" -m "resize images"
    git commit --quiet --allow-empty --date="$d" -m "final touches"

                fi
            fi
        fi
    fi
((daysHacked++))
done

###############################################################################

# E = mc2 Converter
COUNT=10
(
while test $COUNT != 110
do
    echo $COUNT
    echo "XXX"
    echo "CONVERSION ALGORITHMS RUNNING"
    echo "XXX"
    COUNT=`expr $COUNT + 10`
    sleep .5
done
) | dialog --title "E = mc2 CONVERTER" --gauge "" 8 70 0

###############################################################################

# E = mc3 message
dialog --backtitle "GitHub Time Hacker" \
    --infobox "E = mc3" 3 31
sleep .9

dialog --backtitle "GitHub Time Hacker" \
    --infobox " " 3 31
sleep .9

dialog --backtitle "GitHub Time Hacker" \
    --infobox "E = mc3" 3 31
siileep .9

dialog --backtitle "GitHub Time Hacker" \
    --infobox " " 3 31
sleep .9
dialog --backtitle "GitHub Time Hacker" \
    --infobox "E = mc3" 3 31
sleep .9
i
###############################################################################

# You are about to hack time are you sure?
dialog --backtitle "GitHub Time Hacker" \
    --title "WARNING" \
    --yesno "\nYOU'RE ABOUT\nTO HACK TIME,\nARE YOU SURE?" 10 30
       
yn_response=$?
case $yn_response in
    0) git push;;
    1) echo "Aborted";;
    255) echo "Aborted";;
esac
