/* Main Menu */
window.onload = init;
// 메인 페이지 초기화
function init(){
	var mainMenuLink = document.querySelectorAll(".main-menu > li > a");
	for(var i=0; i<mainMenuLink.length; i++){
		mainMenuLink[i].onmouseover = function(){
			showSubMenu(this);
		};
		mainMenuLink[i].onfocus = function(){
			showSubMenu(this);
		};
	}
}
// 메인메뉴 선택시 서브메뉴 출력
function showSubMenu(targetNode){
	// 모든 서브메뉴를 숨긴다.
	var hideList = document.querySelectorAll(".main-menu > li > ul");
	for(var i=0; i<hideList.length; i++){
		hideList[i].style.display = "none";
	}	
	// 선택한 메인메뉴의 서브메뉴를 보여준다.
	getElementNextSibling(targetNode).style.display = "block";
}
// 지정한 요소의 다음 노드를 반환한다.
function getElementNextSibling(node){
	var nextElement = node.nextSibling;
	if(nextElement == null){
		return null;
	}else if(nextElement.nodeType != 1){
		return getElementNextSibling(nextElement);
	}
	return nextElement;
}
/* HTML5 Video Player */

	//전역변수 지정
	var video=false;
	var video_timer=false;
	var btn_play=false;
	var range_time=false;
	var play_time_span=false;
	var duration=false;
	var track=false;
	var caption_selector=false;
	
	//video payer 초기화
	function ini_player(){
		var video_player=document.getElementById('videoPlayer');
		video=video_player.getElementsByTagName('video')[0];
		
		video.addEventListener('loadedmetadata',function(){
			duration=Math.floor(video.duration)+1;
			//재생길이 표시 슬라이더 기능 연결
			range_time=video_player.getElementsByClassName('playTimeSlider')[0];
			range_time.setAttribute('max',duration);
			range_time.onchange=function(){
						video.currentTime=this.value;
						duration=Math.floor(video.duration)+1-this.value;
					}
			//재생시간 표시 텍스트 지정 및 초기화
			playtime_span=video_player.getElementsByClassName('playTime')[0];
			play_time();
			//자막객체 확인
			track=video.textTracks;
			//볼륨초기화
			video.volume=0.5;
		});
		
		//브라우저의 기본 콘트롤러를 숨김
		video.removeAttribute('controls');
		
		//기능버튼 초기화
		
		//재생버튼 기능 지정
		btn_play=video_player.getElementsByClassName('btnPlay')[0];
		btn_play.onclick=function(){
									if(this.className=='btnPlay'){
										this.className='btnPause';
										this.innerHTML='pause';
										video.play();
										video_timer=setInterval(play_time,1000);
									}else{
										this.className='btnPlay';
										this.innerHTML='play';
										video.pause();
										if(video_timer){
											clearInterval(video_timer);
										}
									}
								}
		//정지버튼 기능 지정
		btn_stop=video_player.getElementsByClassName('btnStop')[0];
		btn_stop.onclick=function(){
									btn_play.className='btnPlay';
									btn_play.innerHTML='play';
									range_time.value=0;
									video.pause();
									video.load();
									duration=Math.floor(video.duration)+1;
									play_time();
									if(video_timer){
										clearInterval(video_timer);
									}
								}						
		//소리 활서 끄기 버튼 기능 지정
		var btn_volume=video_player.getElementsByClassName('btnVolumeOn')[0];
		btn_volume.onclick=function(){
									if(this.className=='btnVolumeOn'){
										this.className='btnVolumeOff';
										this.innerHTML='off';
										video.muted=true;
									}else{
										this.className='btnVolumeOn';
										this.innerHTML='on';
										video.muted=false;
									}
								}
								
		//볼륭 조절 슬라이더 기능 지정
		var range_volume=video_player.getElementsByClassName('volumeSlider')[0];
		range_volume.onchange=function(){
							video.volume=this.value;				
						}
															
	}//End of ini_player(); 
	
	//재생시간 표시기능 
	function play_time(){
		duration--;
		if(duration==0){
			clearInterval(video_timer);
			btn_play.className='btnPlay';
			btn_play.innerHTML='play';
			range_time.value=0;
			duration=Math.floor(video.duration);
		}
		var time_h=Math.floor(duration/(60*60));
			time_h=(time_h>9)?time_h:'0'+time_h;
		var time_m_temp=duration%(60*60);
		var time_m=Math.floor(time_m_temp/60);
			time_m=(time_m>9)?time_m:'0'+time_m;
		var time_s_temp=time_m_temp%60;
		var time_s=Math.floor(time_s_temp);
			time_s=(time_s>9)?time_s:'0'+time_s;
		var tiem_hms=time_h+':'+time_m+':'+time_s;
		range_time.value++;
		playtime_span.innerHTML=tiem_hms;
	}//End of play_time();