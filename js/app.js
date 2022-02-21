/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll("section");
const navListParent = document.getElementById("navbar__list");
let body = document.querySelector("main");
let counter = 5;
const btn = document.querySelector("#btn");
// build the nav
let frag = document.createDocumentFragment();
for(let sec of sections){
    let idVal = sec.getAttribute("id") //creating elements & setting heading and attr
    let secHead = sec.getAttribute("data-nav");
    let ele = document.createElement("li");
    ele.innerHTML = `<a href="#${idVal}" class="menu__link">${secHead}</a>`; //i'm using href-based method to scroll between sections
    frag.appendChild(ele);
}
navListParent.append(frag);

// Scroll to anchor ID using scrollTO event 
//i did try the id method but it didn't work as intended and my code is fine with href
document.querySelectorAll("a").forEach(link => {
     link.addEventListener("click",function(event){
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior:"smooth"
        });
    });
})

//top button

document.addEventListener("scroll",function (){
    if(document.body.scrollTop >1200){
    btn.style.display = "block";
   }else{
    btn.style.display = "none";
    }
});
btn.addEventListener("click",function(){
document.body.scrollTo({
    top: 0,
    behavior: "smooth",
    });      
});

//add button

const addBtn = document.getElementById("addBtn"); //creating button and it's content
addBtn.addEventListener("click",function(){
    let newNavEle = document.createElement("li");
    let newNode = document.createElement("section");
    newNode.innerHTML=`<div class="landing__container"><h2>Section ${counter}</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
<p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p></div>`;
    newNode.setAttribute("id","section" + counter);
    newNode.setAttribute("data-nav","Section " + counter);
    newNavEle.innerHTML = `<a href="#section${counter}" class="menu__link">Section ${counter}</a>`;
    counter++;
    body.appendChild(newNode);
    navListParent.append(newNavEle);
    obs.observe(newNode);

    //scroll to anchore smoothly feature to the new element

    let newA = newNavEle.firstElementChild;
    newA.addEventListener("click",function(event){
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior:"smooth"
        });
    });  
});

// Add class 'active' to section when near top of viewport

const options = {
    rootmargin: 0 ,
    //fix: the issue was in the threshold value for small screens
    threshold: 0.4
};
let obs = new IntersectionObserver(function(items,obs){
    items.forEach(item => {
        //console.log(item.target);
     if(item.isIntersecting){
         //linking the section observer to apply changes on the navbar when observing a specific element
         let y =item.target.getAttribute("data-nav");
         let x =document.querySelectorAll("a");
         x.forEach(u=>{
             if(u.innerText===y){
                 u.classList.add("active");
             }
             else{
                 u.classList.remove("active");
             }
         })
         //checking the observer
         //console.log(y);
         //console.log(x);
       item.target.classList.add("your-active-class");
     }else{
         item.target.classList.remove("your-active-class");
   }
});
},options); 
sections.forEach(section => {
     obs.observe(section); 
});
