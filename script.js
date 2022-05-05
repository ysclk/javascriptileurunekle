


document.querySelector("form").addEventListener("submit", function (e) {

    //Ürün özellikleri
    //console.log("form gönderildi");
    const urunAdi = document.getElementById("urunAdiId").value;
    const urunModel = document.getElementById("urunModelId").value;
    const urunFiyat = document.getElementById("urunFiyatId").value;
    const message = "", className = "";

    //console.log("Urun adi :" + urunAdi + " Urun modeli : " + urunModel + " Urun fiyati: " + urunFiyat);

    //Ürün nesnesi icin fonksiyona referans
    const urunlerim = new Urunler(urunAdi, urunModel, urunFiyat);
    const ui = new UI();

    //urun eklemeye basla

    ui.urunEkle(urunlerim);

    //form temizle
    ui.formTemizle();
    //bosluk kontrolu saglma
    ui.uyarilar(message, className);

    //ui.resimEkle(fileResim);


    e.preventDefault();


});

const ui = new UI();
//constructor nesnesini burada uyguladik
function Urunler(urunAdi, urunModel, urunFiyat, fileResim) {
    this.urunAdi = urunAdi;
    this.urunModel = urunModel;
    this.urunFiyat = urunFiyat;
    this.fileResim = fileResim;

}
//UI fonksiyonu, sadece prototyp olarak kullanacgim icin icine su anlik bisey yazmadim
function UI() {

}


//UI.prototype.resimEkle = function (fileResim) {
const fileResim = document.querySelector("#fileId");//.files[0];

fileResim.addEventListener('change', function (e) {
    const resimgalerisi = document.querySelector(".resimgalerisi");
    const reader = new FileReader();
    var uploaded_Image = "";
    reader.addEventListener('load', function () {
        uploaded_Image = reader.result;
        //  console.log(this);
        resimgalerisi.innerHTML += "<img class='eklenenResim' src='" + uploaded_Image + "'>";
        resimgalerisi.style.display = "flex";


    });
    reader.readAsDataURL(this.files[0]);
});
//}

// resimgalerisi.innerHTML = "<img src='C:\\Users\\keremveannesi\\Pictures\\" + ui.file.name + "'>";





UI.prototype.uyarilar = function (message, className) {
    const div = document.createElement("div");
    div.className = className;//hata
    const text = document.createTextNode(message);//"Bos alan birakmayiniz!");
    div.appendChild(text);
    const container = document.querySelector(".container");
    const form = document.querySelector("form");
    container.insertBefore(div, form);
    //hata mesajini belli bir zamandan sonra silelim
    setTimeout(() => {
        document.querySelector("." + className + "").remove();
    }, 3000);
}

//ürün ekleme prototype
UI.prototype.urunEkle = function (urunlerim) {
    const liste = document.querySelector("table");
    //elementleri olusturalim
    const tr = document.createElement("tr");
    if (urunlerim.urunAdi != "" && urunlerim.urunFiyat != "" && urunlerim.urunModel != "") {
        tr.innerHTML = '<td>' + urunlerim.urunAdi + '</td><td>'
            + urunlerim.urunModel + '</td><td>'
            + urunlerim.urunFiyat + '</td><td class="sil">X</td>';
        liste.appendChild(tr);
        ui.uyarilar("Basarili bir sekilde eklendi", "basarili");
    }
    else {
        ui.uyarilar("Bos alan birakmayiniz!", "hata");
    }

}

UI.prototype.formTemizle = function () {
    if (document.getElementById("urunAdiId").value != "" && document.getElementById("urunModelId").value != "" && document.getElementById("urunFiyatId").value != "") {
        document.getElementById("urunAdiId").value = "";
        document.getElementById("urunModelId").value = "";
        document.getElementById("urunFiyatId").value = "";
    }

}

//urunleri silelim
document.querySelector("table").addEventListener('click', function (e) {
    ui.urunlerdenSil(e.target);
    // console.log(e);
    e.preventDefault();
});

UI.prototype.urunlerdenSil = function (hedef) {
    if (hedef.className = "sil") {
        var result = window.confirm("Eminmisiniz?");
        //alert("silmek istediginizden emin mmisiniz?");
        if (result == true) {
            hedef.parentElement.remove();
            ui.uyarilar("Basariyla Silindi!", "silindi");
        }
    }
}