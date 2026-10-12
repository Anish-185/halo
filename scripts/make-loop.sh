#!/bin/bash
# Cut a seamless loop from a clip: the last `xfade` seconds dissolve into the
# first, so the final frame matches the first frame exactly.
#
# usage: make-loop.sh in.mp4 start len xfade width out [codec args...]
# e.g.   make-loop.sh src.mp4 1 14 2.5 2560 dawn-2560.webm -c:v libsvtav1 -preset 5 -crf 38
#        make-loop.sh src.mp4 1 14 2.5 2560 dawn-2560.mp4  -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart
set -e
in=$1 s=$2 L=$3 c=$4 w=$5 out=$6; shift 6
off=$(python3 -c "print($L-2*$c)")
ffmpeg -v error -y -ss "$s" -t "$L" -i "$in" -filter_complex "\
[0:v]scale=$w:-2:flags=lanczos,setpts=PTS-STARTPTS,format=yuv420p,split[a][b];\
[a]trim=start=$c,setpts=PTS-STARTPTS[A];\
[b]trim=end=$c,setpts=PTS-STARTPTS[B];\
[A][B]xfade=transition=fade:duration=$c:offset=$off,format=yuv420p[v]" \
  -map "[v]" -an "$@" "$out"
