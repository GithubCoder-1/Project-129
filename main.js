song1 = ""
song2 = ""

status1 = ""
status2 = ""

ScoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function preload()
{
    song1 = loadSound("Harry_Potter.mp3");
    song2 = loadSound("Peter_Pan.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}

function modelLoaded()
{
    console.log('PoseNet is Initialized!');
}

function draw()
{
    image(video, 0, 100, 600, 500); 
    status1 = song1.isPlaying();
   status2 = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(rightWristX > 0.2)
    {
        circle(rightWristX, rightWristY, 20);   
        song2.stop();

        if(status1 == false)
        {
            song1.play();
            document.getElementById('song_name').innerHTML = "Harry Potter Is Playing!";
        }
    }

    if(leftWristX > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if(leftWristY > -10)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Peter Pan Is Playing!";
        }
    }
    
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {

        console.log(results);
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreLeftWrist = " + ScoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}