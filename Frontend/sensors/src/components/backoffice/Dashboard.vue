<template>
  <div class="wrapper">
    <div class="sidebar" data-color="blue" data-image="/src/assets/img/sidebar-4.jpg">

      <!--
          Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
          Tip 2: you can also add an image using data-image tag
      -->

      <div class="sidebar-wrapper">
        <div class="logo">
          <a href="/PiiS/web/dashboard.php" class="simple-text">
            <img class="img-responsive" src="/src/assets/img/logo.png"/>
          </a>
        </div>

        <ul class="nav">
          <li class="active">
            <a href="dashboard.php">
              <i class="pe-7s-graph"></i>
              <p>Početna stranica</p>
            </a>
          </li>
          <li>
            <a href="/PiiS/web/profil.php">
              <i class="pe-7s-user"></i>
              <p>Korisnički profil</p>
            </a>
          </li>
          <li>
            <a href="prostorije.php">
              <i class="pe-7s-home"></i>
              <p>Prostorije</p>
            </a>
          </li>
          <li>
            <a href="obavijesti.php">
              <i class="pe-7s-news-paper"></i>
              <p>Obavijesti</p>
            </a>
          </li>
          <li>
            <a href="postavke.php">
              <i class="pe-7s-switch"></i>
              <p>Postavke</p>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="main-panel">
      <nav class="navbar navbar-default navbar-fixed">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand hidden-xl hidden-lg hidden-md" href="#"><span class="logo-style">sensor.io</span> / Početna stranica</a>
            <a class="navbar-brand hidden-xs hidden-sm" href="#">Početna stranica</a>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <form action="/PiiS/api/logout.php">
                  <input class=" hidden-xs hidden-sm btn btn-info btn-block" type="submit" value="Odjavi se">
                  <input class="hidden-xl hidden-lg hidden-md btn btn-default btn-block" id="logOut" type="submit" value="ODJAVI SE">
                </form>
              </li>
              <li class="separator hidden-lg"></li>
            </ul>
          </div>
        </div>
      </nav>


      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12" id="selector">
              <div class="card" id="listContainer">
              </div>
            </div>
            <div class="col-md-12" id="selector2">

            </div>
          </div>
          <div class="row" id="graphRow">
            <div class="col-md-12" id="chartContainer">
              <canvas id="myChart"></canvas>
            </div>
            <div id="graphOptions" class="col-md-12">
            </div>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="container-fluid">
          <p class="copyright pull-left">
            sensor.io -  <a href="https://github.com/fvukojevic/SensorsIO" target="_blank">Git Hub</a>
          </p>
        </div>
      </footer>

    </div>
  </div>
</template>

<script>
  export default {

  }
</script>
