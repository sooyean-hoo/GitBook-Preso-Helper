// ==UserScript==
// @name         GitBook Preso Helper
// @namespace    http://tampermonkey.net/
// @version      0.1.0.0.20
// @description  Adapt GitBook for Use as Presention ( arrowkeys= <PrevPage  NextPage > , B= Black BG, W = Wide Mode, P = Toggle for Preso Mode, S = Open Search, O = Open Index (Cacheing) )
// @author       Hoo Sooyean 何書淵
// @grant       GM_xmlhttpRequest
// @connect     *
// @include     *://*puppet-kmo.gitbook.io/*
// @include     *://*facebook.com/*
// @run-at      document-end
// @updateURL   https://openuserjs.org/meta/Sooyean-hoo/GitBook_Preso_Helper.meta.js
// @downloadURL https://openuserjs.org/install/Sooyean-hoo/GitBook_Preso_Helper.user.js
// @license MIT
// ==/UserScript==


// //////@    include     *://*/dayreview.html
(function() {
    const $ = (s, x = document) => x.querySelector(s)

    const remotehtmlheader=`

<style>
input,
button{
  border-radius: 30px;
  transition: all 2s;

}
.backend{
  width: 1px;
  height:1px;
}
.gswp,.pp,
.backend img{
  display:none;
}
body{
  opacity:0;
  transition: all 5s;
}
body[data-show="1"]{
  opacity:1;
}
button.Prev,
button.Next{
  width:49%;
  border-width: thick;
  margin-top: 5ch;
}

.my div
{
    transition: all 0.5s;
    border-radius: 1ch 1ch 1ch 0ch;
    border: 0px blue solid;
    padding: 0ch 1ch 0ch 5ch;
    margin-left: -1ch;
    background: linear-gradient(45deg, transparent, blue);
    width: 65vw;
}

.my[data-mode="labs"] div.labs,
.my[data-mode="lessons"] div.lessons,
.my[data-mode="all"] div.all,

#mygswp div[data-active="1"],
#mypp div[data-active="1"]
{
    padding: 0ch 1ch 0ch 20ch;
    background: linear-gradient(45deg, transparent, blue 15%);
    color:yellow ;
    border-radius: 0ch 20ch 2ch 0ch;
    width: 55vw;
}


.my[data-mode="labs"] button,
.my[data-mode="lessons"] button{
    opacity: 0.2;
}
.my[data-mode="labs"] button.labs,
.my[data-mode="lessons"] button.lessons{
    opacity: 1;
}



<!--
  Doc for stun server

   touch /tmp/presenter.txt  ; while [ -e /tmp/presenter.txt  ] ; do data=$(nc -l  8000  ;  echo $data >  /tmp/slidesnow.txt ; echo "rcv:$data" ;done ;

   touch /tmp/slidesnow.txt ; touch /tmp/presentee.txt ;  while [ -e /tmp/presentee.txt  ] ; do data=$(cat  /tmp/slidesnow.txt) ; echo $data | nc -l 8001 ; echo "send:$data" ; done;


-->

</style>
<title>Preso Helper pour V</title>

`
const remotehtmlbody=`

<h1 id=title >GSWP Day Review
<h3  onclick="toggleGitBook(this)" >  ShowOff |&lt;==&gt;| GitBook </h3>
</h1>

<span>ShowOff</span>
<input style="width:80%" id=targeturltxt placeholder='https://classdemorec-slides.classroom.puppet.com/' ></input><button onclick="updateu()">Update</button><br>


<span>GitBook GSWP</span>
<input style="width:80%" id=gswptargeturltxt placeholder='https://puppet-kmo.gitbook.io/gswp/-MFBOrY4wkT-M5izoA2y' ></input><button onclick="update_gswp()">Update</button><br>

<span>GitBook PP</span>
<input style="width:80%" id=pptargeturltxt placeholder='https://puppet-kmo.gitbook.io/puppet-practitioner/-M7hLIlhPVKdwHVdrWBw/' ></input><button onclick="update_pp()">Update</button><br>

<div   id=misc  >
<h1>Misc:</h1>

<Button onclick='clickme(this)'    data-link='https://unwiredlearning.com/wp-content/uploads/2018/07/git-flow-768x513.png'  class='buttonMISC' >Git CheatSheet</Button >
<Button onclick='clickme(this)'    data-link='./01%20git-operations.png'  class='buttonMISC' >Git CheatSheet (Local)</Button >
<Button onclick='clickme(this)'    data-link='./gitflow.png'  class='buttonMISC' >GitFlow (Local)</Button >

<Button onclick='clickme(this)'    data-link='https://lmgtfy.app/?q=git%cheatsheet&t=i&iie=1' class='buttonMISC' >LMGTYF Git CheatSheet</Button >
<Button onclick='clickme(this)'    data-link='https://lmgtfy.app/?q=GitFlow&t=i&iie=1' class='buttonMISC' >LMGTYF GitFlow</Button >

<Button onclick='clickme(this)'    data-link='https://unwiredlearning.com/wp-content/uploads/2018/07/git-flow-768x513.png' class='buttonMISC' >Online Git CheatSheet</Button >
<Button onclick='clickme(this)'    data-link='https://datasift.github.io/gitflow/GitFlowHotfixBranch.png' class='buttonMISC' >Online GitFlow</Button >

<Button onclick='clickme(this)'    data-link='https://github.com/puppetlabs/ilt-getting-started-with-puppet-exercise-guides' class='buttonMISC' >Lab Guide for GSWP</Button >

<input style="width:80%" id=res4lab placeholder='http://2258nix15.classroom.puppet.com/'   ></input>
<Button onclick='this.dataset.link=res4lab.value;clickme(this)'    data-link='http://2258nix15.classroom.puppet.com/' class='buttonMISC' id=res4labbut >Resources for GSWP Lab</Button ><br>

<input style="width:80%" id=url2go placeholder='http://www.puppet.com/'   ></input>
<Button onclick='this.dataset.link=url2go.value;clickme(this)'    data-link='http://2258nix15.classroom.puppet.com/' class='buttonMISC' id= >SEND</Button >
<Button onclick='url2go.value=url2go.value.replace(/^www/gi,"http://www") ; location.assign(url2go.value)'    data-link='http://2258nix15.classroom.puppet.com/' class='buttonMISC' id= >GO</Button ><br>


<Button onclick='clickme(this)'    data-link='https://i1.wp.com/funkyenglish.com/wp-content/uploads/canaryinthecoalmineidiom.jpg?fit=900%2C600&ssl=1' class='buttonMISC' >Bolt Plan: Canary (In a Coal Mine)</Button >
<Button onclick='clickme(this)'    data-link='https://lmgtfy.app/?q=Canary In a Coal Mine&t=i&iie=1' class='buttonMISC' >LMGTYF Bolt Plan: Canary (In a Coal Mine)</Button >

</div>

<Button onclick='document.querySelector("button[ style *= font ]").previousElementSibling.click()'  class='Prev' >&lt;&lt;&lt;&lt;=</Button >
<Button onclick='document.querySelector("button[ style *= font ]").nextElementSibling.click()'  class='Next' >=&gt;&gt;&gt;&gt;</Button >


<div   id=d0  >
<h1>GSWP Day 1:</h1>

</div>

<div id=d1 >
<h1>GSWP Day 2:</h1>
</div>

<div id=mygswp class=my  >
  <h1>GSWP:</h1>
  <div onclick="filterbut('Lesson',this)" class=lessons > Show Lessons </div>
  <div onclick="filterbut('Lab ',this)" class=labs  > Show Labs </div>
  <div onclick="filterbut('',this)"  data-active="1"  class=all  > Show All </div>
</div>

<div id=mypp class=my >
  <h1>PP:</h1>
  <div onclick="filterbut('Lesson',this)"  class=lessons > Show Lessons </div>
  <div onclick="filterbut('Lab ',this)" class=labs> Show Labs </div>
  <div onclick="filterbut('',this)"   data-active="1" class=all > Show All </div>
</div>


<!--
<iframe id="display"  src=""  style="height:90vh" >
</iframe>
-->

<div class="backend gswp" id=gswp >
<div id="__GITBOOK__ROOT__CLIENT__" style="display: flex;"><div class="reset-3c756112--body-68cac36c"><div class="reset-3c756112--header-07037613--header-09ef972a"><div class="reset-3c756112--headerContainer-bb8cc0bc"><div class="reset-3c756112--headerLeftColumn-4eae0bae--headerLeftColumn-7efc9f26"><div role="button" tabindex="-1" class="reset-3c756112--mobileButton-7a76d05f"><svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380--icon-1f8349b3"><g><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></g></svg></div><div class="reset-3c756112--headerLogo-5c0b38e2"><div class="reset-3c756112--mobileLogo-dacfd15c"><a class="link-a079aa82--primary-53a25e66--logoLink-10d08504" href="/gswp/-MFBOrY4wkT-M5izoA2y/" style="color: rgb(247, 125, 5);"><div class="reset-3c756112--tooltipContainer-7fdb9b70--small-2ec8ae1a"><div class="reset-3c756112--avatarFrame-2f40cdc9--small-2ec8ae1a"><img class="image-67b14f24--avatar-1c1d03ec" src="https://gblobscdn.gitbook.com/orgs%2F-M5OLvu-sOI6o3hvr-2o%2Favatar-1587415871582.png?alt=media"></div></div><div class="reset-3c756112--S100Left-7c8af13a--logoDisplayNameContainer-583bfe61--logoText-beffa84c"><span class="text-4505230f--DisplayH700-a03ad9b4--textContentFamily-49a318e1--spaceNameText-677c2969">GSWP</span></div></a></div><div class="reset-3c756112--desktopLogo-a594db90"><a class="link-a079aa82--primary-53a25e66--logoLink-10d08504" href="/gswp/-MFBOrY4wkT-M5izoA2y/" style="color: rgb(247, 125, 5);"><div class="reset-3c756112--tooltipContainer-7fdb9b70--medium-296350e4"><div class="reset-3c756112--avatarFrame-2f40cdc9--medium-296350e4"><img class="image-67b14f24--avatar-1c1d03ec" src="https://gblobscdn.gitbook.com/orgs%2F-M5OLvu-sOI6o3hvr-2o%2Favatar-1587415871582.png?alt=media"></div></div><div class="reset-3c756112--S100Left-7c8af13a--logoDisplayNameContainer-583bfe61--logoText-beffa84c"><span class="text-4505230f--DisplayH700-a03ad9b4--textContentFamily-49a318e1--spaceNameText-677c2969">GSWP</span></div></a></div></div><div role="button" tabindex="-1" class="reset-3c756112--mobileButton-7a76d05f"><svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380--icon-1f8349b3"><g><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></g></svg></div></div><div class="reset-3c756112--headerInnerWrapper-629f79d1--headerInnerWrapper-4f99acea"><div class="reset-3c756112--withScrollbar-39338630--scrollAxisX-bf86cd6c--headerInner-c872fc48"></div></div><div class="reset-3c756112--searchInputWrapper-ea7f3052--searchInputWrapper-0442d130"><div class="reset-3c756112--inputContainer-b2cb171c"><div aria-label="" class="reset-3c756112--inputWrapper-63396dac--TextH400-3033861f--medium-4505230f--light-502263b4--input-6d442051--searchInput-3fa812d5"><div class="reset-3c756112--inputInnerSizer-756c9114"><input placeholder="Search..." type="text" class="inputInner-5c86b87d--medium-0bbed4bd--inputInner-4216b016--searchInputPlaceholder-936306be"></div><div class="reset-3c756112--inputAddOn-45de9ec1--inputAddOnPrefix-202fa60d--icon-1f8349b3"><svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380"><g><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></g></svg></div></div></div></div></div></div><div class="reset-3c756112--bodyContent-2f98451b"><div class="reset-3c756112--wholeContent-9fc567d4"><div class="reset-3c756112--wholeContentBody-554be184" data-maxscreen="-1"><div role="presentation" class="reset-3c756112--backdrop-1322b68a--hidden-247382c3--overlay-29559ab8"></div><div class="reset-3c756112--contentNavigation-dd3370a4"><div class="reset-3c756112--contentNavigationInner-205d49ea--contentNavigationInnerCollapsed-7b4aca00"><div class="reset-3c756112--sidebarWrapper-84a13d8e"><div class="reset-3c756112" style="padding-bottom: 0px;"></div><div class="reset-3c756112--sidebar-84a13d8e" style="position: relative; max-height: 736px;"><div class="reset-3c756112--navigationHeader-2c71cfec"><div class="reset-3c756112--navigationHeaderLogo-756c9114"><div class="reset-3c756112--mobileLogo-dacfd15c"><a class="link-a079aa82--primary-53a25e66--logoLink-10d08504" href="/gswp/-MFBOrY4wkT-M5izoA2y/" style="color: rgb(247, 125, 5);"><div class="reset-3c756112--tooltipContainer-7fdb9b70--small-2ec8ae1a"><div class="reset-3c756112--avatarFrame-2f40cdc9--small-2ec8ae1a"><img class="image-67b14f24--avatar-1c1d03ec" src="https://gblobscdn.gitbook.com/orgs%2F-M5OLvu-sOI6o3hvr-2o%2Favatar-1587415871582.png?alt=media"></div></div><div class="reset-3c756112--S100Left-7c8af13a--logoDisplayNameContainer-583bfe61--logoText-beffa84c"><span class="text-4505230f--DisplayH700-a03ad9b4--textContentFamily-49a318e1--spaceNameText-677c2969">GSWP</span></div></a></div><div class="reset-3c756112--desktopLogo-a594db90"><a class="link-a079aa82--primary-53a25e66--logoLink-10d08504" href="/gswp/-MFBOrY4wkT-M5izoA2y/" style="color: rgb(247, 125, 5);"><div class="reset-3c756112--tooltipContainer-7fdb9b70--medium-296350e4"><div class="reset-3c756112--avatarFrame-2f40cdc9--medium-296350e4"><img class="image-67b14f24--avatar-1c1d03ec" src="https://gblobscdn.gitbook.com/orgs%2F-M5OLvu-sOI6o3hvr-2o%2Favatar-1587415871582.png?alt=media"></div></div><div class="reset-3c756112--S100Left-7c8af13a--logoDisplayNameContainer-583bfe61--logoText-beffa84c"><span class="text-4505230f--DisplayH700-a03ad9b4--textContentFamily-49a318e1--spaceNameText-677c2969">GSWP</span></div></a></div></div><div class="reset-3c756112"><button class="button-36063075--medium-6e2a217a--button-285d2c81--medium-54db2ab3"><span class="medium-3bde6db7--iconOnly-bddce91a"><svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380"><g><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></g></svg></span><span class="text-4505230f--UIH400-4e41e82a--textUIFamily-5ebd8e40--text-8ee2c8b2"></span></button></div></div><div class="reset-3c756112--sidebarMain-13701e8f--sidebarMainWithHeader-7d9d70ef"><div class="reset-3c756112--withScrollbar-39338630--scrollAxisY-7680295e--sidebarInner-18a1e7fe"><div class="reset-3c756112--mobileHeader-4e2d4892"><div role="button" tabindex="-1" class="reset-3c756112--mobileHeaderClose-47b8fa64"><svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380"><g><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></g></svg></div></div><div class="reset-3c756112--pagesTree-4b07cd56"><div class="reset-3c756112--pageItem-01e3f344"><div class="reset-3c756112--pageComponent-7cc5301a"><a class="navButton-94f2579c--navButtonClickable-161b88ca" href="/gswp/-MFBOrY4wkT-M5izoA2y/"><span class="text-4505230f--UIH300-2063425d--textContentFamily-49a318e1--navButtonLabel-14a4968f">Getting Started with Puppet</span></a></div></div><div class="reset-3c756112"><div class="reset-3c756112--pageItemWithChildren-56f27afc" draggable="true"><div class="reset-3c756112"><div class="reset-3c756112--pageItem-01e3f344"><div class="reset-3c756112--pageComponent-7cc5301a"><a class="navButton-94f2579c--navButtonClickable-161b88ca" href="/gswp/-MFBOrY4wkT-M5izoA2y/table-of-contents"><span class="text-4505230f--UIH300-2063425d--textContentFamily-49a318e1--navButtonLabel-14a4968f">Table of Contents</span>
<span class="reset-3c756112--navButtonIcon-433c72ce--navButtonIconClickable-11a89312" role="presentation">




</div>



<div class="backend pp" id=pp >

<div id="__GITBOOK__ROOT__CLIENT__" style="display: flex;"><div class="reset-3c756112--body-68cac36c"><div class="reset-3c756112--header-07037613--header-11420428"><div class="reset-3c756112--headerContainer-bb8cc0bc"><div class="reset-3c756112--headerLeftColumn-4eae0bae--headerLeftColumn-7efc9f26"><div role="button" tabindex="-1" class="reset-3c756112--mobileButton-7a76d05f"><svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380--icon-1f8349b3"><g><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></g></svg></div><div class="reset-3c756112--headerLogo-5c0b38e2"><div class="reset-3c756112--mobileLogo-dacfd15c"><a class="link-a079aa82--primary-53a25e66--logoLink-10d08504" href="/puppet-practitioner/-MFBOjyVETcxjlTAR_Hx/" style="color: rgb(255, 70, 66);"><div class="reset-3c756112--logoFrame-7067fa09--fullLogo-41e173d5"><img class="image-67b14f24--logo-35ac2404--small-5fbe8ad7" src="https://gblobscdn.gitbook.com/spaces%2F-M6q5--j7eChx9QjBRxc%2Favatar-rectangle-1596556590207.png?alt=media"></div></a></div><div class="reset-3c756112--desktopLogo-a594db90"><a class="link-a079aa82--primary-53a25e66--logoLink-10d08504" href="/puppet-practitioner/-MFBOjyVETcxjlTAR_Hx/" style="color: rgb(255, 70, 66);"><div class="reset-3c756112--logoFrame-7067fa09--fullLogo-41e173d5"><img class="image-67b14f24--logo-35ac2404--medium-5fbe8af6" src="https://gblobscdn.gitbook.com/spaces%2F-M6q5--j7eChx9QjBRxc%2Favatar-rectangle-1596556590207.png?alt=media"></div></a></div></div><div role="button" tabindex="-1" class="reset-3c756112--mobileButton-7a76d05f"><svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380--icon-1f8349b3"><g><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></g></svg></div></div><div class="reset-3c756112--headerInnerWrapper-629f79d1--headerInnerWrapper-4f99acea"><div class="reset-3c756112--withScrollbar-39338630--scrollAxisX-bf86cd6c--headerInner-c872fc48"></div></div><div class="reset-3c756112--searchInputWrapper-ea7f3052--searchInputWrapper-0442d130"><div class="reset-3c756112--inputContainer-b2cb171c"><div aria-label="" class="reset-3c756112--inputWrapper-63396dac--TextH400-3033861f--medium-4505230f--light-502263b4--input-6d442051--searchInput-3fa812d5"><div class="reset-3c756112--inputInnerSizer-756c9114"><input placeholder="Search..." type="text" class="inputInner-5c86b87d--medium-0bbed4bd--inputInner-4216b016--searchInputPlaceholder-936306be"></div><div class="reset-3c756112--inputAddOn-45de9ec1--inputAddOnPrefix-202fa60d--icon-1f8349b3"><svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380"><g><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></g></svg></div></div></div></div></div></div><div class="reset-3c756112--bodyContent-2f98451b"><div class="reset-3c756112--wholeContent-9fc567d4"><div class="reset-3c756112--wholeContentBody-554be184" data-maxscreen="-1"><div role="presentation" class="reset-3c756112--backdrop-1322b68a--hidden-247382c3--overlay-29559ab8"></div><div class="reset-3c756112--contentNavigation-dd3370a4"><div class="reset-3c756112--contentNavigationInner-205d49ea--contentNavigationInnerCollapsed-7b4aca00"><div class="reset-3c756112--sidebarWrapper-84a13d8e"><div class="reset-3c756112" style="padding-bottom: 0px;"></div><div class="reset-3c756112--sidebar-84a13d8e" style="position: relative; max-height: 661.594px;"><div class="reset-3c756112--sidebarMain-13701e8f"><div class="reset-3c756112--withScrollbar-39338630--scrollAxisY-7680295e--sidebarInner-18a1e7fe"><div class="reset-3c756112--mobileHeader-4e2d4892"><div role="button" tabindex="-1" class="reset-3c756112--mobileHeaderClose-47b8fa64"><svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" class="icon-7f6730be--text-3f89f380"><g><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></g></svg></div></div><div class="reset-3c756112--pagesTree-4b07cd56"><div class="reset-3c756112--pageItem-01e3f344"><div class="reset-3c756112--pageComponent-7cc5301a"><a class="navButton-94f2579c--navButtonClickable-161b88ca" href="/puppet-practitioner/-MFBOjyVETcxjlTAR_Hx/"><span class="text-4505230f--UIH300-2063425d--textContentFamily-49a318e1--navButtonLabel-14a4968f">Puppet Practitioner</span></a></div></div><div class="reset-3c756112"><div class="reset-3c756112--pageItemWithChildren-56f27afc" draggable="true"><div class="reset-3c756112"><div class="reset-3c756112--pageItem-01e3f344"><div class="reset-3c756112--pageComponent-7cc5301a"><a class="navButton-94f2579c--navButtonClickable-161b88ca" href="/puppet-practitioner/-MFBOjyVETcxjlTAR_Hx/table-of-content"><span class="text-4505230f--UIH300-2063425d--textContentFamily-49a318e1--navButtonLabel-14a4968f">Table of contents</span><span class="reset-3c756112--navButtonIcon-433c72ce--navButtonIconClickable-11a89312" role="presentation">
</div>
`


const gswpPrefix_default="https://puppet-kmo.gitbook.io/gswp/-MFBOrY4wkT-M5izoA2y/"
const ppPrefix_default="https://puppet-kmo.gitbook.io/puppet-practitioner/-MFBOjyVETcxjlTAR_Hx/"
var dayReviews=new Array();

dayReviews[0]       =[ 20, 21 , 26 , 39 , 40 , 67 , 71 ,72, 73 , 74 , 77, 78 , 79   ]
dayReviews[1]       =[ 95 , 99, 101 , 105 , 107, 108, 114 , 116,  124, 125, 126, 128, 135 , 136 , 148, 151, 152 , 154 ,       158, 164, 170, 171, 172,    1000 ]

var dayReviewsGitBook={
  '20':'Where are you in the journey?', '21':'The Puppet Portfolio' , '26':'Puppet Enterprise' , '39':'Using Bolt' , '40':'Puppet agent or Bolt snippet examples' , '67':'Imperative vs. Declarative Puppet', '71':'The Puppet Way' ,'72':'Puppet Resources', '73':'Desired State' , '74':'What is the Puppet Agent?' , '77':'Introduction to Bolt Apply', '78':'Applying Puppet Code with a Plan' , '79':'Applying Puppet Code with a Plan',

 '95':'Agent Scheduling' , '99':'Puppet Resources.', '101':'Origin of Resource Types' , '105':'Simulating Change with Puppet' , '107':'Facter', '108':'External Facts', '114':'Modules' , '116':'Puppet Module Badges',  '124':'Lesson 8: Wrapper Classes', '125':'Module Customization', '126':'Modules.', '128':'Define and Declare', '135':'PDK Tools' , '136':'Module Structure' , '148':'Puppet Style Guide', '151':'Overview of Unit Testing', '152':'Testing Modules' , '154':'System Testing',
 '158':'Lesson 10: Roles and Profiles', '164':'Roles and Profiles', '170':'Control Repo in Puppet', '171':'Puppetfile', '172':'What is Code Manager?',
  '1000': 'Hiera Visualization' }





const remotehtmlscript=`

var gswpPrefix_default="https://puppet-kmo.gitbook.io/gswp/-MFBOrY4wkT-M5izoA2y/"
var ppPrefix_default="https://puppet-kmo.gitbook.io/puppet-practitioner/-MFBOjyVETcxjlTAR_Hx/"

var dayReviews=new Array();'





`

    const clickme=(me)=>{
          if ( typeof(me.dataset)  != "undefined" &&  typeof(me.dataset.link)  != "undefined"
              &&   me.dataset.link  != "" &&  ( me.dataset.link.match(/^[.]/i) ||   me.dataset.link.match(/^http[s]*:/i) )  ) {
              return Window.owin_open( "?js=" + escape(  "location.assign( '"+me.dataset.link +"')"  ) ) ;
          }
    }
    const getUrlSearchMap=()=>{
      if (  typeof urlSearchMap  == "undefined" || Object.keys(urlSearchMap).length == 0  )
          var urlSearchMap=urlSearchParser();
      return urlSearchMap ;
    }
    const getUrlSearchMapValue=(key)=>{
        var var2Ret=getUrlSearchMap()[key] ;
        if ( typeof(var2Ret) == "undefined" ) var2Ret=getUrlSearchMapValue2(key) ;
        return var2Ret   ;
    }
    const getUrlSearchMapValue2=(name)=>{
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null) {
            return undefined;
        }
        else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }
    const getUrlSearchMapContains =(key)=>{
        return typeof(getUrlSearchMapValue(key)) != "undefined"   ;
    }
    const urlSearchParser =()=>{
        var urlSearch= document.location.search.replace(/,/g,"@").replace(/:/g,"!")  ;
        var urlSearchJSON =urlSearch.replace(/&/g,"\",\"").replace(/=/g,"\":\"").replace(/[?]/g,"");

        urlSearchJSON =urlSearchJSON.replace(/^["][,]["]/  , ""  );

        // urlSearchJSON=unescape(urlSearchJSON);
        urlSearchJSON=urlSearchJSON.replace(/["][,]["]["][,]["]/g  , "&&"  );

        if ( urlSearchJSON  == ""   ) return "{}";
        try{
            var urlSearchMap_ = JSON.parse("{\""+urlSearchJSON+"\"}");
            for ( i in urlSearchMap_ ){
                urlSearchMap_[i]=urlSearchMap_[i].replace(/@/g,",").replace(/!/g,":")  ;
                urlSearchMap_[i]=unescape(urlSearchMap_[i]);
            }
            return  urlSearchMap_;
        }catch(e){
            console.log( "urlSearchParser() Error:"+ urlSearchJSON);
            return undefined;
        }
        return {};
    }

const remotehtmlscript2=`
var targetURL= location.search.replace(/^.+http/, "http").replace(/#+$/, "")  ;


function getUrlSearchMap(){
  if (  typeof(urlSearchMap ) == "undefined" || Object.keys(urlSearchMap).length == 0  ) urlSearchMap=urlSearchParser();
  return urlSearchMap ;
}
function getUrlSearchMapValue(key){
  var var2Ret=getUrlSearchMap()[key] ;
  if ( typeof(var2Ret) == "undefined" ) var2Ret=getUrlSearchMapValue2(key) ;
  return var2Ret   ;
}
function getUrlSearchMapValue2(name){
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if (results == null) {
    return undefined;
  }
  else {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
function getUrlSearchMapContains(key){
  return typeof(getUrlSearchMapValue(key)) != "undefined"   ;
}
function urlSearchParser(){
  var urlSearch= document.location.search.replace(/,/g,"@").replace(/:/g,"!")  ;
  var urlSearchJSON =urlSearch.replace(/&/g,"\",\"").replace(/=/g,"\":\"").replace(/[?]/g,"");

  urlSearchJSON =urlSearchJSON.replace(/^["][,]["]/  , ""  );

  // urlSearchJSON=unescape(urlSearchJSON);
  urlSearchJSON=urlSearchJSON.replace(/["][,]["]["][,]["]/g  , "&&"  );

  if ( urlSearchJSON  == ""   ) return "{}";
  try{
    var urlSearchMap_ = JSON.parse("{\""+urlSearchJSON+"\"}");
    for ( i in urlSearchMap_ ){
      urlSearchMap_[i]=urlSearchMap_[i].replace(/@/g,",").replace(/!/g,":")  ;
      urlSearchMap_[i]=unescape(urlSearchMap_[i]);
    }
    return  urlSearchMap_;
  }catch(e){
    console.log( "urlSearchParser() Error:"+ urlSearchJSON);
    return undefined;
  }
  return {};
}





targetURL=getUrlSearchMapValue('showoff')
targeturltxt.value= ( typeof targetURL != "undefined")   ?  targetURL : ""
targetURL=targeturltxt.value
function updateu(){
     location.assign(  location.href.replace( /[#?].+$/,"")+"?showoff="+targeturltxt.value )
}



gswpPrefix=getUrlSearchMapValue('gswp')
gswptargeturltxt.value= ( typeof gswpPrefix != "undefined")   ?  gswpPrefix :  gswpPrefix_default
gswpPrefix=gswptargeturltxt.value
function update_gswp(){
     location.assign(  location.href.replace( /[#?].+$/,"")+"?gswp="+gswptargeturltxt.value )
}



ppPrefix=getUrlSearchMapValue('pp')
pptargeturltxt.value=  ( typeof ppPrefix != "undefined")   ?  ppPrefix : ppPrefix_default
ppPrefix=pptargeturltxt.value
function updatepp(){
     location.assign(  location.href.replace( /[#?].+$/,"")+"?pp="+pptargeturltxt.value )
}



res=getUrlSearchMapValue('res')
res4lab.value=  ( typeof res != "undefined")   ?  res : 'http://2258nix15.classroom.puppet.com/'
res4labbut.dataset.link=res4lab.value







dayReviews[0]       =[ 20, 21 , 26 , 39 , 40 , 67 , 71 ,72, 73 , 74 , 77, 78 , 79   ]
dayReviews[1]       =[ 95 , 99, 101 , 105 , 107, 108, 114 , 116,  124, 125, 126, 128, 135 , 136 , 148, 151, 152 , 154 ,       158, 164, 170, 171, 172,    1000 ]

var dayReviewsGitBook={
  '20':'Where are you in the journey?', '21':'The Puppet Portfolio' , '26':'Puppet Enterprise' , '39':'Using Bolt' , '40':'Puppet agent or Bolt snippet examples' , '67':'Imperative vs. Declarative Puppet', '71':'The Puppet Way' ,'72':'Puppet Resources', '73':'Desired State' , '74':'What is the Puppet Agent?' , '77':'Introduction to Bolt Apply', '78':'Applying Puppet Code with a Plan' , '79':'Applying Puppet Code with a Plan',

 '95':'Agent Scheduling' , '99':'Puppet Resources.', '101':'Origin of Resource Types' , '105':'Simulating Change with Puppet' , '107':'Facter', '108':'External Facts', '114':'Modules' , '116':'Puppet Module Badges',  '124':'Lesson 8: Wrapper Classes', '125':'Module Customization', '126':'Modules.', '128':'Define and Declare', '135':'PDK Tools' , '136':'Module Structure' , '148':'Puppet Style Guide', '151':'Overview of Unit Testing', '152':'Testing Modules' , '154':'System Testing',
 '158':'Lesson 10: Roles and Profiles', '164':'Roles and Profiles', '170':'Control Repo in Puppet', '171':'Puppetfile', '172':'What is Code Manager?',
  '1000': 'Hiera Visualization' }

function toggleGitBook(me){
  textCa = me.innerHTML.split("|")
    me.innerHTML=textCa[2]+"|"+textCa[1]+"|"+textCa[0]

  document.querySelectorAll("button").forEach( but_=>{
    if ( typeof(but_.dataset) != "undefined" && typeof(but_.dataset.page) != "undefined"    ){
      oldCaption= but_.dataset.page
      newCaption=dayReviewsGitBook[oldCaption] ;

      if ( but_.innerText == "Page " + oldCaption   ) {
        gitbookBut=document.getElementById(  newCaption  );
        if ( gitbookBut ==null ){
          console.log("Missing GitBook Button:" + newCaption )
        }else{
          but_.innerText = newCaption
          but_.dataset.link =gitbookBut.dataset.link
        }
      }else{
        but_.innerText = "Page " + oldCaption
        but_.dataset.link =""
      }
    }

  }
  )

}

dayReviews.forEach(function(dayRev, index, array) {
  dayRev.forEach(function(page, index_, array_) {

                     divC=document.getElementById("d"+(index) );

                  //alert(  "<Button >Page " + page + "</Button >  " )

                     divC.innerHTML+="<Button onclick='clickme(this)' data-page='"+page+"'  id=but"+page+" class='button' >Page " + page + "</Button >  "
                  }
  )
  }
)
var owin
function owin_open(url___){
  if ( typeof owin == "undefined" ||  owin.opener == null  ){
      owin=window.open( url___ );
  }else{
      owin.location = url___  ;
  }
}

//var last_pagenum = document.querySelector(".button").nextElementSibling.textContent.replace(/[^0-9]/g,"")
var pagenum = document.querySelector(".button").nextElementSibling.textContent.replace(/[^0-9]/g,"")

function clickme(me){

  if ( typeof(me.dataset)  != "undefined" &&  typeof(me.dataset.link)  != "undefined"
    &&   me.dataset.link  != "" &&  ( me.dataset.link.match(/^[.]/i) ||   me.dataset.link.match(/^http[s]*:/i) )  ) {
      return owin_open(  me.dataset.link   ) ;
    }



  if ( typeof(me.dataset)  != "undefined" &&  typeof(me.dataset.link)  != "undefined"
    &&   me.dataset.link  != ""  ) return  gitbookClickme(me) ;



  //last_pagenum=pagenum

  pagenum= me.textContent.replace(/[^0-9]/g,"")

  owin_open( targetURL+"#"+pagenum);

  pagenum="but"+pagenum
  //display.src = targetURL+"#"+pagenum
  document.querySelectorAll("button").forEach( x => x.style.fontSize = ""   )

  me.style.fontSize = "10vw"

}

function pkey(){
  if ( event.target.tagName == "INPUT" ) return

  switch(event.keyCode) {
    case 87: // W
    case 66: // b
      switch(event.keyCode) {
      case 87: // W
        html_in="<body style=background-color:white></body>"
        break;
      case 66: // b
        html_in="<body style=background-color:black></body>"
        break;
      }
      //targetURL_in="data:text/html," + escape(html_in)
      targetURL_in="?html=" + escape(html_in)

      owin_open(  targetURL_in  ) ;

      break;
    case 32:
    case 34: //PageDown
    case 40: //Down
    case 39:

      // Right
      curO=document.getElementById(pagenum) ;

      if ( curO.nextElementSibling.tagName == "BUTTON" )  clickme(curO.nextElementSibling)

      break;
    case 38: //Up
    case 33: //Page Up
    case 37:
      // Left
      cur1=document.getElementById( pagenum) ;

      curO=cur1.parentElement.firstElementChild.nextElementSibling
      while(  curO.id != cur1.id   || typeof(curO) == "undefined"   ) {
        lastChild=curO
        curO=curO.nextElementSibling
      }
      if ( lastChild.tagName == "BUTTON" )  clickme(lastChild)

      break;
    default:
      // code block
  }
}

function refreshCourse(){

    ////// For GSWP
    buttonTracker={}
    document.querySelectorAll(".gswp a").forEach( x=> {
      //console.log( x.innerText  )

      buttonCaption = x.innerText

      while ( typeof( buttonTracker[buttonCaption]  ) != "undefined" ) {  buttonCaption = buttonCaption + "."; }

      //x.innerText.replace(/[.]/g, "")

      mygswp.innerHTML+=
        "<Button onclick='gitbookClickme(this)' data-link='"+x.href+"' id='" + buttonCaption  + "' class='button' >" +  buttonCaption + "</Button >  "

      buttonTracker[buttonCaption] = true

    })



    ////// For PP
    buttonTracker={}
    document.querySelectorAll(".pp a").forEach( x=> {
      //console.log( x.innerText  )

      buttonCaption = x.innerText

      while ( typeof( buttonTracker[buttonCaption]  ) != "undefined" ) {  buttonCaption = buttonCaption + "."; }

      // x.innerText.replace(/[.]/g, "")

      mypp.innerHTML+=
        "<Button onclick='gitbookClickme(this)' data-link='"+x.href+"' id='" +  buttonCaption   + "' class='button' >" +  buttonCaption + "</Button >  "
      buttonTracker[buttonCaption] = true

    })
}
refreshCourse()


buttonTracker={}


function gitbookClickme(me){

  pagenum= me.dataset.link.replace(/file:\/\//g,"")

  gitbookBase=gswpPrefix.replace(/io\/.+$/g,"io")

  owin_open(  gitbookBase+pagenum  ) ;

  pagenum=me.id;

  //display.src = targetURL+"#"+pagenum
  document.querySelectorAll("button").forEach( x => x.style.fontSize = ""   )

  me.style.fontSize = "10vw"

}
function filterbut(text2highlight,me_){

  if ( ! event.shiftKey )
    me_.parentElement.querySelectorAll("div").forEach(x=>x.dataset.active="");

  me_.dataset.active="1"

  if ( text2highlight == "" ){
    document.querySelectorAll("#" + me_.parentElement.id + " button").forEach(x=>x.style.opacity=1);
  }else{
    if ( ! event.shiftKey )
      document.querySelectorAll("#" + me_.parentElement.id + " button").forEach(x=>x.style.opacity=0.2);
    document.querySelectorAll("#" + me_.parentElement.id + " button[id*=\""+text2highlight+"\"]").forEach(x=>x.style.opacity=1)
  }
}







html=getUrlSearchMapValue('html')
if ( typeof html != "undefined") {
  document.body.outerHTML =html ;
}
document.body.dataset.show=1;


jsData=getUrlSearchMapValue('js')
if ( typeof jsData != "undefined") {
  eval(jsData);
}

setTimeout("  toggleGitBook(document.querySelector(\"h3\"))  ", 3000)

`
    const css = `
div[ class *= wholeContentBody ] div {
    transition: all .5s ease-in-out;
}

div[ class *= wholeContentBody ][ data-maxscreen="1"  ] div[ class *= contentNavigation  ] {
   width: 1ch;
   min-width: 1ch;
   padding:0;
}
div[ class *= wholeContentBody ][ data-maxscreen="1"  ] div[ class *= pageContainer ] {
   padding: 0;
   max-width: 100vw;
}
div[ class *= wholeContentBody ][ data-maxscreen="1"  ] div[ class *= pageSide ] {
   width: 1ch;
   min-width: 1ch;
}

div[ class *= wholeContentBody ][ data-maxscreen="2"  ] div[ class *= contentNavigation ] {
    width: auto;
    padding: 0px;
}
div[ class *= wholeContentBody ][ data-maxscreen="2"  ] div[ class *= pageContainer ] {
    max-width: 80vw;
}

div[ class *= wholeContentBody ][ data-maxscreen="3"  ] div[ class *= navigationHeader ],
div[ class *= wholeContentBody ][ data-maxscreen="3"  ] div[ class *= sidebarMainWithHeader ],
div[ class *= wholeContentBody ][ data-maxscreen="3"  ] div[ class *= contentNavigation ],
div[ class *= wholeContentBody ][ data-maxscreen="3"  ] div[ class *= wholeContentPage ] {
    background: grey ;
}






body div[role="complementary"]{
    transition: all .5s ease-in-out;
}
body[ data-maxscreen="1"  ] div[role="complementary"]{
    width: 1px;
}



.owin {
    width: 0vw;
    height: 0vh;
    position: fixed;
    z-index: 100;
    top: 0px;
    left: 0px;
    transition: all 2s;
    opacity:0;
}
.owin input{
    width: 1000px;
}


.owin[ data-state ^= "1"  ] {
    width: 100vw;
    height: 100vh;
    opacity:1;
    background:white;
}

.owin[ data-state ^= "10"  ] {
    background: radial-gradient(circle at 0% 0%, #000, #AAA 65%, transparent  ) ;
    background-repeat: no-repeat ;
    background-size: cover;
    width: 5%;
    height: 5%;
    opacity: 0.75;
}

`
    const $getCookie=( cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    const $setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    const $el = (tag, opts) => {
        const el = document.createElement(tag)
        Object.assign(el, opts)
        return el
    }



  const cp_Paste = (text2cp ) => {
                let owin_obj = document.querySelector('.owin')
                if ( typeof owin_obj == "undefined" ||   owin_obj == null  ){
                  owin_obj=document.createElement("div");
                  owin_obj.classList="owin"
                  owin_obj.innerHTML="<iframe src=''  style='width:100%;height:100%'></iframe>      <input   type='text' value='' id='myInput'>"
                  document.querySelector('body').appendChild(owin_obj)
              }
      /* Get the text field */
      var copyText = document.getElementById("myInput");
          copyText.value = text2cp

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 524288); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      /* Alert the copied text */
      alert("Copied the text: " + copyText.value.substr(0, 20));
   }
    $('head').appendChild($el('style', { textContent: css }))

  var remote=null

  setTimeout( x => {

      if (  typeof Window.owin_open == "undefined" )
          Window.owin_open= url___ => {
              let owin_obj = document.querySelector('.owin')

              if ( typeof owin_obj == "undefined" ||   owin_obj == null  ){
                  owin_obj=document.createElement("div");
                  owin_obj.classList="owin"
                  owin_obj.innerHTML="<iframe src=''  style='width:100%;height:100%'></iframe>      <input   type='text' value='' id='myInput'>"
                  document.querySelector('body').appendChild(owin_obj)
              }
              owin_obj = document.querySelector('.owin ')
              owin_obj.dataset.state= url___ == '' ? 0 : 1;
              //owin_obj.innerHTML="<iframe src='"+url___+"'  style='width:100%;height:100%'></iframe>"
              //owin_obj.src=
              document.querySelector('.owin iframe').contentWindow.location= url___
          }

    var nodetmp ;

    if ( $('div[role="presentation"]') != null ) {
        $('div[role="presentation"]').addEventListener('auxclick', function (event) {
            const parentpresoObj= $("body")

            let maxscr=$getCookie('maxscreen')

            parentpresoObj.dataset.maxscreen *= -1 ;
            parentpresoObj.dataset.maxscreen = Math.max(
                parentpresoObj.dataset.maxscreen,
                -1
            )
            $setCookie('maxscreen',parentpresoObj.dataset.maxscreen , 300) ;
          }
        )
    }

    if ( $("div[ class *= wholeContentBody ]") != null ) {
        let maxscr=$getCookie('maxscreen')
        if ( maxscr == "" ) { maxscr=-1 ; $setCookie('maxscreen',maxscr, 300) ; }
        $("div[ class *= wholeContentBody ]").dataset.maxscreen = maxscr ;

        let owin_obj = document.querySelector('.owin')
        if ( typeof owin_obj == "undefined" ||   owin_obj == null  ){
            owin_obj=document.createElement("div");
            owin_obj.classList="owin"
            owin_obj.innerHTML="<iframe src=''  style='width:100%;height:100%'></iframe>      <input   type='text' value='' id='myInput'>"
            document.querySelector('body').appendChild(owin_obj)
        }
        owin_obj.dataset.state=100


        $("body").addEventListener('keydown', function (event) {

            const parentpresoObj=$("div[ class *= wholeContentBody ]")



            if (event.code === 'KeyB' && event.srcElement.tagName != 'INPUT' ) {
                $("div[ class *= wholeContentBody ]").dataset.maxscreen = 3 ;
            }else if (event.code === 'KeyW' && event.srcElement.tagName != 'INPUT' ) {
                $("div[ class *= wholeContentBody ]").dataset.maxscreen = 2 ;
            }else if (event.code === 'KeyP' && event.srcElement.tagName != 'INPUT' ) {
                parentpresoObj.dataset.maxscreen *= -1 ;
                parentpresoObj.dataset.maxscreen = Math.max(
                    parentpresoObj.dataset.maxscreen,
                    -1
                )
                $setCookie('maxscreen',parentpresoObj.dataset.maxscreen , 300) ;
            }else if (event.code === 'KeyX' && event.srcElement.tagName != 'INPUT' ) {
                let objIndex=document.querySelector("#__GITBOOK__ROOT__CLIENT__")
                cp_Paste( objIndex.outerHTML )
            }else if (event.code === 'KeyV' && event.srcElement.tagName != 'INPUT' ) {

                remote=window.open()
                remote.document.querySelector('head').innerHTML=remotehtmlheader
                remote.document.querySelector('body').innerHTML=remotehtmlbody


                let objIndex=document.querySelector("#__GITBOOK__ROOT__CLIENT__")
                if ( objIndex !=  null ) {
                    remote.document.querySelector(".gswp").innerHTML=objIndex.outerHTML
                    //remote.document.querySelector(".pp").innerHTML=objIndex.outerHTML
                }
                //let scriptObj=remote.document.createElement("script")
                //scriptObj.innerHTML=remotehtmlscript
                //remote.document.querySelector("body").appendChild(scriptObj)

                let buttonTracker={}
                let uuid=0;
                let selStrs = ['#__GITBOOK__ROOT__CLIENT__ a'] ; //['.gswp a' ]
                selStrs.forEach( selStr => {
                    if ( typeof(  document.querySelectorAll(selStr)) != 'undefined' &&
                       document.querySelectorAll(selStr).length > 0 ){
                        document.querySelectorAll(selStr).forEach( x=> {
                            //console.log( x.innerText  )


                            let buttonCaption = x.innerText

                            while ( typeof( buttonTracker[buttonCaption]  ) != "undefined" ) {  buttonCaption = buttonCaption + "."; }

                            //x.innerText.replace(/[.]/g, "")
                            let button_Obj=remote.document.createElement("button");
                            button_Obj.id=buttonCaption ;
                            button_Obj.dataset.link=x.href ;
                            button_Obj.dataset.classtag=x.classList[0] ;

                            x.dataset.uuid=uuid
                            button_Obj.dataset.uuid=uuid
                            uuid++

                            let additionalClass="button";
                            if (  buttonCaption.indexOf("Lab") > -1  ){
                                additionalClass+= ' labs'
                            }
                            if (  buttonCaption.indexOf("Lesson") > -1  ){
                                 additionalClass+= ' lessons'
                            }

                            //button_Obj.class='button ' + additionalClass ;
                            button_Obj.classList=additionalClass ;
                            button_Obj.innerHTML=buttonCaption ;
                            button_Obj.addEventListener('click', function (event) {
                                    Window.owin_open('')
                                    let me = event.srcElement
                                  let pagenum= me.dataset.link.replace(/file:\/\//g,"")

                                    //let gitbookBase=gswpPrefix.replace(/io\/.+$/g,"io")

                                     //owin_open(  gitbookBase+pagenum  ) ;
                                     //location =  gitbookBase+pagenum

                                     //let hitbut=document.querySelector("."+me.dataset.classtag)
                                     let hitbut=document.querySelector('a[data-uuid = "' + me.dataset.uuid + '"]')
                                     
                                     if ( hitbut == null ) {
                                       links2use=me.dataset.link.replace(/https:\/\/[^\/]+\//g,"/")
                                       hitbut=document.querySelector('a[href *= "' + links2use + '"]')
                                       
                                       if ( hitbut == null ) {
                                          location.href=links2use
                                       }else {
                                           hitbut.dataset.uuid = me.dataset.uuid  ;
                                       }
                                     }
                                     hitbut.click();

                                     pagenum=me.id;

                                //display.src = targetURL+"#"+pagenum
                                     remote.document.querySelectorAll("button").forEach( x => x.style.fontSize = ""   )

                                     me.style.fontSize = "10vw"

                            })

                            //let mydivname=selStr.replace(" a","").replace(".","#my")
                            let mydivname="#mygswp"
                            remote.document.querySelector(mydivname).appendChild(button_Obj)

                            //remote.document.querySelector('#mygswp').innerHTML+=
                            //    "<Button onclick='gitbookClickme(this)' data-link='"+x.href+"' id='" + buttonCaption  + "' class='button' >" +  buttonCaption + "</Button >  "

                            buttonTracker[buttonCaption] = true

                        })
                    }
                });

                remote.document.querySelector('#mygswp').dataset.mode='all'
                remote.document.querySelector('#mypp').dataset.mode='all'

                remote.document.querySelector('#mygswp div.all').dataset.active=''
                remote.document.querySelector('#mypp div.all').dataset.active=''

                dayReviews.forEach(function(dayRev, index, array) {
                    dayRev.forEach(function(page, index_, array_) {

                    let divC=remote.document.getElementById("d"+(index) );

                        let button_Obj=remote.document.createElement("button");

                        button_Obj.id="but" + page
                        button_Obj.classList="button"

                        button_Obj.innerHTML="Page " + page
                        button_Obj.innerHTML=dayReviewsGitBook[page.toString()]

                        button_Obj.dataset.page= page
                        button_Obj.addEventListener('click', function (event) {
                                    let me = event.srcElement
                                    remote.document.querySelector('.my button[id = "'+me.innerHTML+'"]').click();
//                                  let pagenum= me.dataset.link.replace(/file:\/\//g,"")


//                                     let hitbut=document.querySelector("."+me.dataset.classtag)
//                                     hitbut.click();

                                     remote.document.querySelectorAll("button").forEach( x => x.style.fontSize = ""   )
                                     me.style.fontSize = "10vw"
                                     Window.owin_open('')
                            })


                        divC.appendChild(button_Obj)
                  //alert(  "<Button >Page " + page + "</Button >  " )

                    // divC.innerHTML+="<Button onclick='clickme(this)' data-page='"+page+"'  id=but"+page+" class='button' >Page " + page + "</Button >  "
          })
                })



                remote.document.querySelectorAll('.my div.all,.my div.labs,.my div.lessons').forEach( myfilter => {
                            myfilter.dataset.active='';
                            myfilter.addEventListener('click', function (event) {
                                    let me = event.srcElement
                                    me.parentElement.dataset.mode = me.innerText.replace(/show /i,"").toLowerCase() ;
                            })
                })

                remote.document.querySelector("body").addEventListener('keyup', function (event) {
                    let me = event.srcElement
                    switch(event.keyCode) {
                        case 87: // W
                        case 66: // b
                            let html_in=''
                            switch(event.keyCode) {
                                case 87: // W
                                    html_in="<body style=background-color:white></body>"
                                    break;
                                case 66: // b
                                    html_in="<body style=background-color:black></body>"
                                    break;
                            }
                            //let targetURL_in="data:text/html," + escape(html_in)
                            let targetURL_in="?html=" + escape(html_in)

                            Window.owin_open(  targetURL_in  ) ;

                            break;
                        case 32:
                        case 34: //PageDown
                        case 40: //Down
                        case 39:

                            // Right
                            remote.document.querySelector('.Next').click();
                            break;
                        case 38: //Up
                        case 33: //Page Up
                        case 37:
                            // Left
                            remote.document.querySelector('.Prev').click();
                            break;
                        default:
                            // code block
                    }
                })
                remote.document.querySelectorAll("button.buttonMISC").forEach( buttonMisc => {
                    buttonMisc.addEventListener('click', function (event) {
                                    let me = event.srcElement
                                    if ( typeof(me.dataset)  != "undefined" &&  typeof(me.dataset.link)  != "undefined"
                                        &&   me.dataset.link  != "" &&  ( me.dataset.link.match(/^[.]/i) ||   me.dataset.link.match(/^http[s]*:/i) )  ) {
                                        //return Window.owin_open( "?js=" + escape(  "location.assign( '"+me.dataset.link +"')"  ) ) ;
                                        //return Window.owin_open( "?js=" + escape(  "window.open( '"+me.dataset.link +"')"  ) ) ;
                                        return Window.owin_open( "?html="+escape("<meta http-equiv = \"refresh\" content = \"2; url = " + me.dataset.link + "\" />")  ) ;
                                    }
                            })
                })


//                remote.document.querySelector('.Prev').addEventListener('click', function (event) {
//                                   remote.document.querySelector("button[ style *= font ]").previousElementSibling.click()
//                            })
//                remote.document.querySelector('.Next').addEventListener('click', function (event) {
//                                    remote.document.querySelector("button[ style *= font ]").nextElementSibling.click()
//                            })


                remote.document.querySelector('body').dataset.show=1;
                Window.remote=remote





            }else if (event.code === 'KeyS' && event.srcElement.tagName != 'INPUT' ) {
                Window.owin_open('')
                document.querySelectorAll("div[ class *= navigationHeader ] svg , input[ placeholder *= Search ] ") [0].parentElement.click()
            }else if (event.code === 'ArrowRight') {
                Window.owin_open('')
                $("button[ class *= Next ],button[ class *= Next ],button[ class *= right ],a[ class *= right ],[ id *= next ],[ class *= Next ]").click();
            }else if (event.code === 'ArrowLeft') {
                Window.owin_open('')
                $("button[ class *= Prev ],button[ class *= prev ],button[ class *= left ],a[ class *= left ],[ id *= prev ],[ class *= Prev ]").click();
            }else if (event.code === 'KeyO' && event.srcElement.tagName != 'INPUT' ) {
                nodetmp=[] ; document.querySelectorAll('span[ role = "presentation" ][ class *= "navButtonIconClickable" ]').forEach( x=> nodetmp.push(x)) ;
                function a(){ nodetmp.pop().click() ; if ( nodetmp.length > 0 ) setTimeout(  a, 100) ; }
                setTimeout( a, 100) ;
            }else if (event.code === 'KeyC' && event.srcElement.tagName != 'INPUT' ) {
                Window.owin_open('')
                nodetmp=[] ; document.querySelectorAll('#__GITBOOK__ROOT__CLIENT__ a, a[ href *= "puppet" ][ class *= "navButtonClickable" ][ class *= "pageItemWithChildrenNested" ]').forEach( x=> nodetmp.push(x)) ;
                function a(){  let bb=nodetmp.pop();  if( bb.href .indexOf( 'https://www.gitbook.com') == -1 && bb.querySelectorAll("svg[class *= 'Expand']").length == 0 ) bb.click() ;    if ( nodetmp.length > 0 ) setTimeout(  a, 2000) }
                setTimeout( a, 100)
            }

        });
    }

      let html=getUrlSearchMapValue('html')
      if ( typeof html != "undefined") {
          document.body.outerHTML =html ;
      }
      document.body.dataset.show=1;


      let jsData=getUrlSearchMapValue('js')
      if ( typeof jsData != "undefined") {
          eval(jsData);
      }
      setTimeout("document.querySelector('.owin').dataset.state=0",1000 )
  }, 3000 ) ;

})();
