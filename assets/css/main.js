
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playBtn = $('.controlBar__icon-playBtn')
const listSong = $('.listSong')
const progress = $('#progress')



// console.log(playBtn)
// const player = $()



const app = {
    repeat: false,
    random: false,
    currentIndex: 2,
    isPlaying: false,
    songs : [
        {
            name: 'Đố anh đoán được',
            singer: 'Bích Phương',
            path: './assets/musics/song1.mp3',
            image: './assets/img/song1.jpg'
        },
        {
            name: 'Đừng gọi anh dậy',
            singer: 'Phúc Du',
            path: './assets/musics/song2.mp3',
            image: './assets/img/song2.jpg'
        },
        {
            name: 'Phải chăng em đã yêu',
            singer: 'Yuki-San',
            path: './assets/musics/song3.mp3',
            image: './assets/img/song3.jpg'
        },
        {
            name: 'Sài Gòn đau lòng quá',
            singer: 'Hoàng Duyên',
            path: './assets/musics/song4.mp3',
            image: './assets/img/song4.jpg'
        },
        {
            name: 'Sài Gòn hôm nay mưa',
            singer: 'Json & Hoàng Duyên',
            path: './assets/musics/song5.mp3',
            image: './assets/img/song5.jpg'
        },
        {
            name: 'Laylalay',
            singer: 'Jack',
            path: './assets/musics/song6.mp3',
            image: './assets/img/song6.jpg'
        },
        {
            name: 'Toang vào nhau',
            singer: 'King-B',
            path: './assets/musics/song7.mp3',
            image: './assets/img/song7.jpg'
        }
    ],

    
    handleEvents: function() {

        const repeatBtn = $('.controlBar__icon-repeat')
        const cd = $('.song_img')
        const randomBtn = $('.controlBar__icon-random')
        const cdWidth = cd.offsetWidth 
        const listSongItem = $$('.listSong__item')
        const maxIndex = listSongItem.length
        const audio = $('#audio')
        const next = $('.controlBar__icon-forward')
        const backward = $('.controlBar__icon-backward')

       
        // xu ly cd quay va dung
        const cdAnimate = cd.animate([
            {transform: 'rotate(360deg)'}
        ],
        {
            duration: 10000, //quay trong 1 vong bao nhieu s
            iterations: Infinity // co lap lai hay khong , lap lai bao nhieu lan
        }
        )
        cdAnimate.pause()

        // xử lý phóng thu ảnh cd khi kéo lên xuống
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            const newCdHeight = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.height = newCdHeight > 0 ? newCdHeight + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // xử lý khi play
        playBtn.onclick = function() {

          
            if (!app.isPlaying) {
                audio.play()
                
            }
            else {
                audio.pause()
            }
        }

        // xu ly khi thay doi icon icon
        audio.onplay = function(){
            app.isPlaying = true;
            cdAnimate.play()
            playBtn.classList.add('playing')
            playBtn.style.backgroundColor = '#f3a8bb'
            
        }
        audio.onpause = function() {
            app.isPlaying = false;
            cdAnimate.pause()
            playBtn.classList.remove('playing')
            playBtn.style.backgroundColor = 'var(--primary-color)'

        }

        // xu ly khi click thay doi bai hat 
        
        listSongItem.forEach((element,index) => {
            element.onclick = function(){

                const heading = $('.musicControl__nowplaying__description h3')
                const songImg = $('.song_img')
                const audio = $('#audio')

                document.querySelector('.listSong__item.active').classList.remove('active')
                // element.classList.add('active')
                // console.log(element)
                // const head = element.querySelector('.listSong__item .listSong__item-info h3').textContent
                // const img = element.querySelector('.listSong__item .listSong__item-img').style.backgroundImage   
                // // console.log(app.songs[index].path)
                // heading.innerHTML = head
                // songImg.style.backgroundImage = img
                // audio.src = app.songs[index].path
                app.currentIndex = index;
                // console.log(app.currentIndex)
                app.loadCurrentSong()
                audio.play()
                
                

                // console.log(audio)

            }
            
        });
        
        // xu ly khi bia hat chay , thanh o duoi chay theo
        audio.ontimeupdate = function() {
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent
        }

        // xu ly khi tua bai hat 
        progress.onchange = function(e) {
            setTime = e.target.value / 100 * audio.duration
            audio.currentTime = setTime
        }

        // xu ky khi bam next bai 
        next.onclick = function() {

            if (app.random){
                let newRandom
                do {
                    newRandom = Math.floor(Math.random() *app.songs.length)
                }
                while (app.currentIndex == newRandom)

                app.currentIndex = newRandom

                document.querySelector('.listSong__item.active').classList.remove('active')
                app.loadCurrentSong()
                audio.play()
            }
            else {
                app.currentIndex +=1
                if (app.currentIndex<maxIndex){
                app.loadCurrentSong()
                audio.play()
                document.querySelector('.listSong__item.active').classList.remove('active')
            } else {
                document.querySelector('.listSong__item.active').classList.remove('active')
                app.currentIndex = 0
                app.loadCurrentSong()
                audio.play()
                }
            }  
            
        }

        // xử lý khi bấn backward bài

        backward.onclick = function() {
            app.currentIndex -=1
            // console.log(app.currentIndex)
            if (app.currentIndex > -1){
                document.querySelector('.listSong__item.active').classList.remove('active')
                app.loadCurrentSong()
                audio.play()
            }
            else {
                app.currentIndex = maxIndex
                app.loadCurrentSong()
                document.querySelector('.listSong__item.active').classList.remove('active')
                audio.play()
            }
            
            
        }

        // xử lý khi click random bài hát
        randomBtn.onclick = function() {
            app.random = !app.random
            randomBtn.classList.toggle('chosen', app.random)
        }

        // xu ly khi an lap lai bai hat lai
        repeatBtn.onclick = function() {
            app.repeat = !app.repeat
            repeatBtn.classList.toggle('chosen', app.repeat)
            audio.loop = !audio.loop
            // console.log(audio.loop)
        }

        // tu dong next bai
        
        audio.onended = function() {
            if (app.random == false && app.repeat == false) {
                app.currentIndex +=1
                if (app.currentIndex<maxIndex){
                app.loadCurrentSong()
                audio.play()
                document.querySelector('.listSong__item.active').classList.remove('active')
            } else {
                document.querySelector('.listSong__item.active').classList.remove('active')
                app.currentIndex = 0
                app.loadCurrentSong()
                audio.play()
                }

            }
            if (app.random == true) {
                let newRandom
                do {
                    newRandom = Math.floor(Math.random() *app.songs.length)
                }
                while (app.currentIndex == newRandom)

                app.currentIndex = newRandom

                document.querySelector('.listSong__item.active').classList.remove('active')
                app.loadCurrentSong()
                audio.play()
            }
        }

        


    },


    define: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
   
    
    loadCurrentSong: function() {
        const heading = $('.musicControl__nowplaying__description h3')
        const songImg = $('.song_img')
        const audio = $('#audio')
        const listSongItem = $$('.listSong__item')

        
        
        
        heading.textContent = this.currentSong.name
        songImg.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        listSongItem[this.currentIndex].classList.add('active')
    
    },

    render: function() {
        const htmls = this.songs.map(function(song){
            return `
                <div class="listSong__item">
                    <div class="listSong__item-img" style="background-image: url('${song.image}')">

                    </div>
                    <div class="listSong__item-info">
                        <h3 class="listSong__item-info-header">
                            ${song.name}
                        </h3>
                        <div class="listSong__item-info-author">
                            ${song.singer}
                        </div>
                    </div>
                    <div class="listSong__item-info-icon">
                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </div>
                </div>
            `
        })

        $('.listSong').innerHTML = htmls.join('')
    },

    start: function() {
        // định nghĩa các thuộc tính cho object
        this.define()

        // render lại cái playlist
        this.render()
        
        // tải thông tin bài hát đầu tiền vào UI khi chạy app
        this.loadCurrentSong()
        
        
        // lắng nghe và xử lý các sự kiện (DOM events)
        this.handleEvents()




    }
}

app.start()