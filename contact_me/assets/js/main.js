document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'complete') {
        setTimeout(function(){
           document.getElementById('interactive');
           document.getElementById('loader').classList.add('transition')
           setTimeout(function (){document.getElementById('loader').style.visibility = "hidden"}, 500);
        },1000);
    }
  }
  

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
const darkmode = new darken({
    toggle: "#nightmode_icon",
    variables : {
        "--body_background" : ["rgb(239 246 247)","rgb(33, 32, 37)"],
        "--card_background" : ["rgb(255 255 255)","rgb(66 57 70 / 30%)"],
        "--card_text_color" : ["black","white"],
        "--small_title_color" : ["black","#ffffffc4"],
        
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