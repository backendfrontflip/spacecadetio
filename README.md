<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->
  <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon-32x32.png"> 
  <title>Frontend Mentor | QR code component</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
* {
    margin: 0;
    padding: 0;
}
body {
    font-family: 'Outfit', sans-serif;
    background-color: hsl(212, 45%, 89%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    font-size: 15px;
}
.container {
    max-width: 360px;
    margin: 0 auto;
}
.card {
    background-color: hsl(0, 0%, 100%);
    padding: 18px;
    border-radius: 17px;
    text-align: center;
    margin: 0 1em;
}
.card img {
    width: 100%;
    border-radius: 12px;
}
.text {
    padding: 22px 10px;
}
.text h2 {
    color: hsl(218, 44%, 22%);
    padding-bottom: 15px;
}
.text p {
    color: hsl(220, 15%, 55%);
}
@media only screen and (max-width: 1440px) {
	.responsive {
	  width: 49.99999%;
	  margin: 6px 0;
	}
  }
  
  @media only screen and (max-width: 375px) {
	.responsive {
	  width: 100%;
	}
  }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <img src="images/image-qr-code.png" alt="">
      <div class="text">
        <h2>Improve your front-end skills by building projects</h2>
        <p>Scan the QR code to visit Frontend Mentor and take your coding skills to the next level</p>
      </div>
    </div>
  </div>
</body>
</html>
