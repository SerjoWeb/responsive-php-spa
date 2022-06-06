<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>SPA SSR</title>

  <link rel="stylesheet" href="./assets/css/app.css" />
</head>
<body>
  <div class="app" id="app">
    <header>
      <div class="wrapper">
        <div class="mobile-nav">
          <button type="button" id="toggle-mobile-nav">&#9776;</button>
        </div>

        <div class="empty"></div>
        <nav id="header-nav">
          <ul>
            <li><a href="#" class="mobile-nav-close" id="mobile-nav-close">&#10005;</li>
            <li><a href="#">Коттеджи</a></li>
            <li><a href="#">Локации</a></li>
            <li><a href="#">О проекте</a></li>
            <li><a href="#">Бронирование</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main>
      <div class="sidebar">
        <h1>Коттеджи A-frame</h1>
        <nav>
          <ul>
            <li><a href="#slide-1" class="sidebar-nav-link active">A-frame Red</a></li>
            <li><a href="#slide-2" class="sidebar-nav-link">A-frame Orange</a></li>
            <li><a href="#slide-3" class="sidebar-nav-link">A-frame Lime</a></li>
          </ul>
        </nav>
      </div>
      <div class="content">
        <div class="mobile-nav-slides">
          <button type="button" id="prev" data-slide="1">
            <span>&#10096;</span>
            <span>&#10096;</span>
          </button>

          <button type="button" id="next" data-slide="2">
            <span>&#10097;</span>
            <span>&#10097;</span>
          </button>
        </div>
        <div class="slider">
          <?php
            /**
             * I used local data because
             * "https://elki.rent/test/aframe.json" has CORS blocking for outside
             * */

            $fetch = file_get_contents("data/data.json");
            $data = json_decode($fetch);

            foreach($data as $item) {
              echo "
                <div class=\"slide\" id=\"slide-" . $item->id . "\">
                  <h2>" . $item->name . "</h2>
                  <div class=\"scroll-image\">
                    <div class=\"scroll-image-item\">
              ";

              foreach($item->images as $image) {
                echo "
                  <div class=\"image\">
                    <div class=\"image-mask\">&#9787; Изображение грузится...</div>
                    <img src=\"" . $image . "\" height=\"100%\" width=\"100%\" alt=\"" . $item->name . "\" loading=\"eager\" ismap>
                  </div>
                ";
              }

              echo "
                    </div>
                  </div>
                  <p>" . $item->description . "</p>
                  <p>от " . $item->price . "руб./сут</p>
                </div>
              ";
            }
          ?>
        </div>
      </div>
    </main>
  </div>

  <script src="./assets/js/app.js" defer></script>
</body>
</html>