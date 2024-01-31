document.addEventListener('DOMContentLoaded', function () {
  var iframe1 = document.getElementById('iframe1');
  var iframe2 = document.getElementById('iframe2');
  var map2 = L.map("map2").setView([30, 70], 5.5);

  L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map2);

  document.getElementById('mainButton0').addEventListener('click', function () {
      document.getElementById('map2').classList.add('hidden');
      iframe1.classList.add('hidden');
      iframe2.classList.add('hidden');
  });

  document.getElementById('mainButton1').addEventListener('click', function () {
      document.getElementById('map2').classList.add('hidden');
      iframe1.classList.remove('hidden');
      iframe2.classList.add('hidden');
  });

  document.getElementById('mainButton2').addEventListener('click', function () {
      document.getElementById('map2').classList.add('hidden');
      iframe1.classList.add('hidden');
      iframe2.classList.remove('hidden');
  });

  document.getElementById('mainButton3').addEventListener('click', function () {
      iframe1.classList.add('hidden');
      iframe2.classList.add('hidden');
      document.getElementById('map2').classList.remove('hidden');
  });

  document.body.appendChild(iframe1);
  document.body.appendChild(iframe2);

  const mainButton3 = document.getElementById("mainButton3");
  const mainButton3con = document.getElementById("mainButton3con");

  mainButton3.addEventListener("click", function () {
      if (mainButton3con.style.display === "none") {
          mainButton3con.style.display = "block";
      } else {
          mainButton3con.style.display = "none";
      }
  });
});