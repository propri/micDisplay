# Mic Display Applet

This applet is used to display if a microphone is muted or not.

It calls two scripts to determine if the mic is muted and to toggle the microphone mute.

```
is_mic_muted.sh # determine if the microphone is muted. Outputs yes or no
```

```
mic_mute_toggle.sh # toggle mute of the microphone
```

I am using this script to toggle the mute state:

```
#!/bin/bash

# My microphone is called TONOR_TC30
ID=$(pactl list short sources | grep TONOR_TC30 | cut -f1)

pactl set-source-mute $ID toggle
```

I use this script to check the mute state:

```
#!/bin/bash

# grep for tonor microphone
MUTED=$(LANG=C pactl list sources | grep -E 'Name:|Mute:' | grep -i tonor -A 1 | grep -i mute | cut -f2 -d' ')
# outputs yes | no
echo $MUTED
```

# Installation

Make sure the scripts to mute / check for mute are in your path and executable.

Copy this directory to `$HOME/.local/share/cinnamon/applets/`.

You can now add the applet from the Applets application.
