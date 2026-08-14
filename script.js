/* =====================================================
   CHUYỂN TRANG
===================================================== */

const pages = document.querySelectorAll(".page");


function showPage(id){

    pages.forEach(page => {

        page.classList.toggle(
            "active",
            page.id === id
        );

    });


    document
        .querySelectorAll(".navbar nav button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === id
            );

        });


    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


document.addEventListener("click",event=>{

    const button =
        event.target.closest("[data-page]");

    if(button){

        showPage(
            button.dataset.page
        );

    }


    /* CLICK EFFECT */

    const ripple =
        document.getElementById("ripple");

    ripple.style.left =
        event.clientX + "px";

    ripple.style.top =
        event.clientY + "px";


    ripple.classList.remove("show");

    void ripple.offsetWidth;

    ripple.classList.add("show");

});



/* =====================================================
   NHẠC TRANG CHỦ
===================================================== */

const miniAudio =
    document.getElementById("miniAudio");

const miniPlay =
    document.getElementById("miniPlay");


miniPlay.addEventListener("click",()=>{

    if(miniAudio.paused){

        miniAudio
            .play()
            .catch(()=>{});

    }else{

        miniAudio.pause();

    }

});


miniAudio.addEventListener(
    "play",
    ()=>{
        miniPlay.textContent = "Ⅱ";
    }
);


miniAudio.addEventListener(
    "pause",
    ()=>{
        miniPlay.textContent = "▶";
    }
);



/* =====================================================
   THƯ VIỆN
===================================================== */

const galleryTrack =
    document.getElementById(
        "galleryTrack"
    );

const galleryItems =
    [
        ...document.querySelectorAll(
            ".gallery-item"
        )
    ];

const galleryDots =
    document.getElementById(
        "galleryDots"
    );


let galleryIndex = 2;


/* Tạo dấu chấm */

galleryItems.forEach(
    (_,index)=>{

        const dot =
            document.createElement("i");

        if(index === galleryIndex){

            dot.classList.add("active");

        }

        galleryDots.appendChild(dot);

    }
);



function updateGallery(){

    if(!galleryItems.length){

        return;

    }


    const windowBox =
        document.querySelector(
            ".gallery-window"
        );


    const itemWidth =
        galleryItems[0]
            .getBoundingClientRect()
            .width;


    const gap = 18;


    /*
       Tính toán để ảnh được chọn
       nằm chính giữa màn hình.
    */

    const offset =
        galleryIndex *
        (itemWidth + gap)
        -
        (
            windowBox.clientWidth -
            itemWidth
        ) / 2;


    galleryTrack.style.transform =
        `translateX(${-offset}px)`;


    galleryItems.forEach(
        (item,index)=>{

            item.classList.toggle(
                "active",
                index === galleryIndex
            );

        }
    );


    [
        ...galleryDots.children
    ].forEach(
        (dot,index)=>{

            dot.classList.toggle(
                "active",
                index === galleryIndex
            );

        }
    );

}



/* NÚT ẢNH TIẾP */

document
    .getElementById("nextPhoto")
    .addEventListener(
        "click",
        ()=>{

            galleryIndex =
                (
                    galleryIndex + 1
                )
                %
                galleryItems.length;

            updateGallery();

        }
    );



/* NÚT ẢNH TRƯỚC */

document
    .getElementById("prevPhoto")
    .addEventListener(
        "click",
        ()=>{

            galleryIndex =
                (
                    galleryIndex - 1
                    +
                    galleryItems.length
                )
                %
                galleryItems.length;

            updateGallery();

        }
    );


window.addEventListener(
    "resize",
    updateGallery
);


setTimeout(
    updateGallery,
    100
);



/* =====================================================
   ÂM NHẠC
===================================================== */


/*
   MUỐN ĐỔI BÀI HÁT THÌ VỀ SAU
   CHỈ CẦN ĐỔI TÊN + FILE Ở INDEX.HTML
   HOẶC ĐỔI FILE NHẠC TRONG THƯ MỤC AUDIO.
*/


const songs = [

    {
        title:"Beanie",
        artist:"DA LAB",
        file:"audio/song.mp3",
        image:"images/music1.jpg"
    },

    {
        title:"Daylight",
        artist:"David Kushner",
        file:"audio/song2.mp3",
        image:"images/music2.jpg"
    },

    {
        title:"Người tình mùa đông",
        artist:"Hà Anh Tuấn",
        file:"audio/song3.mp3",
        image:"images/music3.jpg"
    },

    {
        title:"Tíc tắc x 25",
        artist:"Táo x Bray",
        file:"audio/song4.mp3",
        image:"images/music4.jpg"
    }

];


const audio =
    document.getElementById(
        "mainAudio"
    );


const songTitle =
    document.getElementById(
        "songTitle"
    );


const songArtist =
    document.getElementById(
        "songArtist"
    );


const albumImage =
    document.getElementById(
        "albumImage"
    );


const progress =
    document.getElementById(
        "progress"
    );


const current =
    document.getElementById(
        "current"
    );


const total =
    document.getElementById(
        "total"
    );


const playButton =
    document.getElementById(
        "play"
    );


let songIndex = 0;



function loadSong(
    index,
    autoplay = false
){

    songIndex =
        (
            index +
            songs.length
        )
        %
        songs.length;


    const song =
        songs[songIndex];


    songTitle.textContent =
        song.title;


    songArtist.textContent =
        song.artist;


    albumImage.src =
        song.image;


    audio.src =
        song.file;


    document
        .querySelectorAll(".song")
        .forEach(
            (button,index)=>{

                button.classList.toggle(
                    "active",
                    index === songIndex
                );

            }
        );


    if(autoplay){

        audio
            .play()
            .catch(()=>{});

    }

}



/* BẤM VÀO BÀI */

document
    .querySelectorAll(".song")
    .forEach(
        button=>{

            button.addEventListener(
                "click",
                ()=>{

                    loadSong(
                        Number(
                            button.dataset.song
                        ),
                        true
                    );

                }
            );

        }
    );



/* BÀI TRƯỚC */

document
    .getElementById("previous")
    .addEventListener(
        "click",
        ()=>{

            loadSong(
                songIndex - 1,
                true
            );

        }
    );



/* BÀI TIẾP */

document
    .getElementById("next")
    .addEventListener(
        "click",
        ()=>{

            loadSong(
                songIndex + 1,
                true
            );

        }
    );



/* PLAY / PAUSE */

playButton.addEventListener(
    "click",
    ()=>{

        if(audio.paused){

            audio
                .play()
                .catch(()=>{});

        }else{

            audio.pause();

        }

    }
);



audio.addEventListener(
    "play",
    ()=>{

        playButton.textContent =
            "Ⅱ";

    }
);


audio.addEventListener(
    "pause",
    ()=>{

        playButton.textContent =
            "▶";

    }
);



/* THỜI LƯỢNG */

audio.addEventListener(
    "loadedmetadata",
    ()=>{

        total.textContent =
            formatTime(
                audio.duration
            );

    }
);



/* THANH TIẾN ĐỘ */

audio.addEventListener(
    "timeupdate",
    ()=>{

        if(audio.duration){

            progress.value =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;

        }


        current.textContent =
            formatTime(
                audio.currentTime
            );

    }
);



/* HẾT BÀI -> BÀI TIẾP */

audio.addEventListener(
    "ended",
    ()=>{

        loadSong(
            songIndex + 1,
            true
        );

    }
);



/* KÉO THANH NHẠC */

progress.addEventListener(
    "input",
    ()=>{

        if(audio.duration){

            audio.currentTime =
                (
                    progress.value /
                    100
                )
                *
                audio.duration;

        }

    }
);



/* ÂM LƯỢNG */

document
    .getElementById("volume")
    .addEventListener(
        "input",
        event=>{

            audio.volume =
                Number(
                    event.target.value
                );

        }
    );



/* ĐỔI GIÂY -> PHÚT */

function formatTime(seconds){

    if(
        !Number.isFinite(
            seconds
        )
    ){

        return "00:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        )
        .toString()
        .padStart(2,"0");


    const secs =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(2,"0");


    return `${minutes}:${secs}`;

}


/* MỞ TRANG CHỦ */

showPage("home");