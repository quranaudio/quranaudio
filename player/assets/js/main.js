onload()
window.onclick = function(event) {
    if (event.target.matches('li.withdropdown') | event.target.matches('i.bx.bx-chevron-down.bxstyle.rotate')) {   
        // console.log('Opening and closing normally')
    }
    else{
        const dropdown = document.getElementsByClassName('withdropdown')
        for(i=0;i<dropdown.length;i++){
            this_dropdown = dropdown[i].nextElementSibling
            dropdown[i].firstElementChild.classList.remove('rotate')
            this_dropdown.style.display = 'none' 
            this_dropdown.classList.remove('visible')
        }
    }
    if (event.target.matches('.bx.bx-menu') | event.target.matches('div.Hamburger_icon') | event.target.matches('ul.resp_withdropdown') | event.target.matches('i.bx.bx-chevron-down.bxstyle') | event.target.matches('div.resp_withdropdown_dropdown')){
        // console.log('Opening responsive menu as normal')
    }
    else{
        document.getElementsByClassName('resp_nav_dropdown')[0].style.display = 'none' 
        document.getElementsByClassName('Hamburger_icon')[0].classList.remove('open')
        document.getElementsByClassName('Hamburger_icon')[0].classList.remove('active')
        document.getElementsByClassName('resp_withdropdown_dropdown')[0].style.display = 'none' 
        resp_nav_dropdown.classList.remove('open')
        resp_nav_dropdown.classList.remove('open')
        resp_withdropdown.classList.remove('open')
        resp_withdropdown.classList.remove('resp_withdropdown_dropdown_active')
        resp_withdropdown.firstElementChild.classList.remove('rotate')
    }
}
var audio_name;
var name;
var audio;
var pause_id_buffer;
function onload(){
    // Via Query parameters - GET
    document.getElementsByClassName("progress_track")[0].addEventListener("click", seek);
    const params = (new URL(document.location)).searchParams;
    name = params.get('shiekh'); 
    audio_name = params.get('audio_name'); 
    document.getElementById('shiekh_picture_hero').firstElementChild.src = "../shiekh_pictures/" + audio_name + ".png"
    
    if(audio_name.includes('ş')){
        audio_name = audio_name.replace("ş","/")
    }
    if(name == null || audio_name == null){
        console.log('ERROR: No shiekh name in header!')
        window.location.href = "../";
    }
    else{
        document.getElementById('hero_title').innerHTML = name;
        audio = new Audio('https://download.quranicaudio.com/quran/' + audio_name + '/001.mp3');
        audio.load();
    }
}
const darkmode = new darken({
    toggle: "#nightmode_icon",
    variables : {
        //         Lightmode,          darkmode
        "--body_background" : ["rgb(239 246 247)","rgb(33, 32, 37)"],
        "--card_background" : ["rgb(255 255 255)","rgb(66 57 70 / 30%)"],
        "--card_text_color" : ["black","white"],
        
    },
    usePrefersColorScheme: true
});
const resp_nav_dropdown = document.getElementsByClassName('Hamburger_icon')[0]
resp_nav_dropdown.addEventListener('click', function(){
    if(resp_nav_dropdown.classList.contains('open')){
        document.getElementsByClassName('resp_nav_dropdown')[0].style.display = 'none' 
        resp_nav_dropdown.classList.remove('open')
        resp_nav_dropdown.classList.remove('active')
    }
    else if(!resp_nav_dropdown.classList.contains('open')){
        document.getElementsByClassName('resp_nav_dropdown')[0].style.display = 'block' 
        resp_nav_dropdown.classList.add('open')
        resp_nav_dropdown.classList.add('active')
        }
    
})

const resp_withdropdown = document.getElementsByClassName('resp_withdropdown')[0]
resp_withdropdown.addEventListener('click', function(){
    if(resp_withdropdown.classList.contains('open')){
        document.getElementsByClassName('resp_withdropdown_dropdown')[0].style.display = 'none' 
        resp_withdropdown.firstElementChild.classList.remove('rotate')
        resp_withdropdown.classList.remove('open')
        resp_withdropdown.classList.remove('resp_withdropdown_dropdown_active')
    }
    else if(!resp_withdropdown.classList.contains('open')){
        document.getElementsByClassName('resp_withdropdown_dropdown')[0].style.display = 'block' 
        resp_withdropdown.firstElementChild.classList.add('rotate')
        resp_withdropdown.classList.add('open')            
        resp_withdropdown.classList.add('resp_withdropdown_dropdown_active')
    }
    
})

function download(id){
    var a = document.createElement("a");
    a.href = 'https://download.quranicaudio.com/quran/' + audio_name + '/' + id + '.mp3';
    a.setAttribute("download", id + '.mp3');
    a.setAttribute("target", '_blank');
    a.click();
    a.remove();
}

function share(id){
  if (navigator.share) { 
   navigator.share({
      title: 'Listen to ' + name + '!',
      url: 'https://download.quranicaudio.com/quran/' + audio_name + '/' + id + '.mp3',
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
    } else {
        alert('ERROR: Share is not supported on this browser yet!')
    }
}
play_from_cards = document.getElementsByClassName('surah_card_play')
for( i=0; i< play_from_cards.length; i++ ){
    play_from_card = play_from_cards[i]    
    play_from_card.addEventListener("click", function() {
        is_it_playing = `${play_icon_changer(this)}`
        hud_appear();
        hud_play(this, is_it_playing)
    });
}
audio.addEventListener("timeupdate", function () {    
    // Sets current time and total time values
    document.getElementsByClassName('hud_played_time')[0].innerHTML = secondsToHms(this.currentTime)
    document.getElementsByClassName('hud_total_time')[0].innerHTML = secondsToHms(this.duration)
    progress_bar = document.getElementsByClassName('progress_bar')[0]
    // Sets background-color on slider
    setBackgroundSize(progress_bar);
})
audio.addEventListener("ended", function () {
    hud_shuffle_button = document.getElementsByClassName('hud_shuffle')[0]
    if(!hud_shuffle_button.classList.contains('active')){    
        surah_numbers = document.getElementsByClassName('surah_number')
        for( j=0; j< surah_numbers.length; j++ ){
            surah_number = surah_numbers[j]
            if(surah_number.innerHTML == pause_id_buffer){
                surah_number.previousElementSibling.click()
            }
        }

    }
    else{
        const random = Math.floor(Math.random() * 114); 
        console.log(random)
        surah_numbers = document.getElementsByClassName('surah_number')
        for( j=0; j< surah_numbers.length; j++ ){
            surah_number = surah_numbers[j]
            if(surah_number.innerHTML == random){
                surah_number.previousElementSibling.click()
            }
        }
    }
}, false);
function setBackgroundSize(progress) {
    // input.style.setProperty("background-size", `${getBackgroundSize()}%`);
    current_time = audio.currentTime
    total_time = audio.duration
    const progress_percentage = (current_time / total_time) * 100
    console.log(progress_percentage)
    progress.style.width = `${progress_percentage}%`;
}

function play_icon_changer(id){
    // if its already playinhg and you click stop-playing button
    if (id.classList.contains('playing')){
        id.classList.remove('playing')
        id.firstElementChild.classList = 'bx bx-play'
        audio.pause();
        return 'stop'
    }
    // Click the play button whether its already playing or different surah
    else{
        cards = document.getElementsByClassName('surah_card_play')            
        // removes all active and playing classes from all the cards (basically restore to default)
        for( i=0; i< cards.length; i++ ){
            card = cards[i]
            if(card.classList.contains('playing')){
                card.parentElement.classList.remove('active')
                card.classList.remove('playing')
                card.firstElementChild.classList = 'bx bx-play'
            }
        }

        // make the card and the button you clicked active
        id.classList.add('playing')
        id.firstElementChild.classList = 'bx bx-pause'
        id.parentElement.classList.add('active')
        // console.log('Start playing');

        // before play_icon_changer, it checks whether its playing from a pause(ie clicking the same surah) or playing from a totally new surah
        surah_id = id.nextElementSibling.innerHTML
        if(pause_id_buffer == surah_id){
            // if its playing from a pause, then you dont have to do anything, just play the audio
            audio.play();
        }
        else{
            // otherwise find the previously played card (using the pause_id_buffer with a for loop) and remove the active from the card
            hide_prev_actives = document.getElementsByClassName('surah_number')
            for( j=0; j< hide_prev_actives.length; j++ ){
                hide_prev_active = hide_prev_actives[j]
                if(hide_prev_active.innerHTML == pause_id_buffer){
                    hide_prev_active.parentElement.classList.remove('active')
                }
            }
            // since this is a new audio we need to make a new source for the audio and also update the buffer to this new surah_id
            audio.setAttribute('src','https://download.quranicaudio.com/quran/' + audio_name + '/' + surah_id + '.mp3');
            audio.play();
            pause_id_buffer = surah_id
        }
        return 'play'
    }

}
function hud_appear(){
    if(!document.getElementsByClassName('hud')[0].classList.contains('hud_appeared')){
        document.getElementsByClassName('hud')[0].classList.add('hud_appeared')
        document.getElementsByClassName('con2')[0].style.paddingBottom = "250px";
    }
}
function hud_play(id,value){
    hud_play_button = document.getElementsByClassName('hud_play')[0]
    if(value == 'play'){
        hud_play_button.classList.add('playing')
        hud_play_button.classList.add('active')
        hud_play_button.classList.add('hud_play_icon')
        hud_play_button.firstElementChild.classList = 'bx bx-pause'
    }
    else if(value == 'stop'){
        hud_play_button.classList.remove('playing')
        hud_play_button.classList.remove('active')
        hud_play_button.classList.remove('hud_play_icon')
        hud_play_button.firstElementChild.classList = 'bx bx-play'
    }
    else if(value == 'manual'){
        surah_numbers = document.getElementsByClassName('surah_number')
        for( j=0; j< surah_numbers.length; j++ ){
            surah_number = surah_numbers[j]
            if(surah_number.innerHTML == pause_id_buffer){
               surah_number.previousElementSibling.click()
            }
        }
    }

}

function hud_loop(){
    hud_loop_button = document.getElementsByClassName('hud_loop')[0]
    if(hud_loop_button.classList.contains('active')){
        hud_loop_button.classList.remove('active')
        audio.loop = false
    }
    else{
        hud_loop_button.classList.add('active')
        audio.loop = true
    }

}

function hud_mute(){
    hud_mute_button = document.getElementsByClassName('hud_mute')[0]
    if(hud_mute_button.classList.contains('muted')){
        hud_mute_button.classList.remove('muted')
        hud_mute_button.classList.remove('active')
        hud_mute_button.firstElementChild.classList = 'bx bx-volume-full'
        audio.muted = false
    }
    else{
        hud_mute_button.classList.add('muted')
        hud_mute_button.classList.add('active')
        hud_mute_button.firstElementChild.classList = 'bx bx-volume-mute'
        audio.muted = true
    }

}
function hud_rewind(){
    audio.currentTime -= 5.0;
}
function hud_fast_forward_right(){
    audio.currentTime += 5.0;
}

function hud_shuffle(){
    hud_shuffle_button = document.getElementsByClassName('hud_shuffle')[0]
    if(hud_shuffle_button.classList.contains('active')){
        hud_shuffle_button.classList.remove('active')
    }
    else{
        hud_shuffle_button.classList.add('active')
    }

}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    if(h === 0){
        return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }
    else{
        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }
    
} 
function seek(e) {
    slider = document.getElementById("progress_bar")
    duration = audio.duration
    audio.currentTime = (e.offsetX / this.offsetWidth) * duration;
}