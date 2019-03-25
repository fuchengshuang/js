console.log("commjs..starting.");
platformType = 0;
var pathName = window.location.pathname
if(pathName == "/module/agent/project_detail.html") {
	console.log("---老平台---");
	platformType = 1;
} else if(pathName == "/ngocp/module/agent/project_detail.html") {
	console.log("---新平台---");
	platformType = 2;
} else {
	console.log("---不启动自动抢单---");
	platformType = 0;
}

if(platformType > 0) {
	var walesonc = 0;
	var allcc = 0;
	
	function setBtnText(btn,text){
		btn.value = text;
	}
	
	function Initlabel() {
		console.log("Initlabel...");
		start = sessionStorage.getItem("ClickStart");
		walesonAddBtn = document.getElementById("waleson_auto_click");
		if(walesonAddBtn != null) {
			if(start == "true") {
				walesonAddBtn.innerHTML = "已开启自动抢单";
			} else {
				walesonAddBtn.innerHTML = "开始自动抢单";
			};
		} else {
			console.log("walesonAddBtn. is null..");
		}
	}

	function StartAuto() {
		walesonAddBtn = document.getElementById("waleson_auto_click");
		if(walesonAddBtn != null) {
			start = sessionStorage.getItem("ClickStart");
			if(start == "true") {
				sessionStorage.setItem("ClickStart", "false");
				//walesonAddBtn.innerHTML = "已停止自动抢单";
				setBtnText(walesonAddBtn,"已停止自动抢单");
			} else {
				ccc = prompt("请输入频率s", "0.2");
				if(ccc != null) {
					freq = ccc * 1000;
					if(freq < 50) {
						freq = 50
					};
					sessionStorage.setItem("freq", freq);
					sessionStorage.setItem("ClickStart", "true");
					setBtnText(walesonAddBtn,"已开启自动抢单");
					//walesonAddBtn.innerHTML = "已开启自动抢单";
				}
			};
		} else {
			window.location.reload();
		}
	}

	function CheckClick() {
		start = sessionStorage.getItem("ClickStart");
		if(start == "true") {
			mydate = new Date();
			timeok = false;
			h = mydate.getHours();
			timeok = (h >= 8);
			if(timeok) {
				wbtn = document.getElementById("waleson_auto_click");
				if(wbtn != null) {
					allcc += 100;
					if(allcc >= freq) {
						if($(".J_grab_single").hasClass("j-ishost")) {
							//wbtn.innerHTML = "主项目自动抢单" + walesonc + "次";
							setBtnText(wbtn,"主项目自动抢单" + walesonc + "次");
							if(platformType == 2) {
								grabSingle(ProDet.busId, null, "isCsb");
							} else {
								grabSingle(ProDet.busId, "", "", true);
							}

						} else {
							//wbtn.innerHTML = "子项目自动抢单" + walesonc + "次";
							setBtnText(wbtn,"子项目自动抢单" + walesonc + "次");
							grabSingle(ProDet.busId);
						}

						walesonc += 1;
						allcc = 0;
					};
				} else {
					window.location.reload();
				}

			}
		}
	}

	function AddBtn() {
		console.log("AddBtn...");
		gwaleson = document.getElementsByClassName("pro-get-button-box")[0];
		if(gwaleson) {
			console.log("createElement button..开启自动抢单.");
			br = document.createElement("br")
			abtn = document.createElement("input");
			abtn.innerHTML = "开启自动抢单";
			abtn.setAttribute("class", "btn btn-yellow btn-mid");
			abtn.setAttribute("id", "waleson_auto_click");
			abtn.setAttribute("type", "button");
			abtn.setAttribute("value", "开启自动抢单");
			abtn.setAttribute("onclick", "javascript:StartAuto()");
			if(platformType == 2) {
				abtn.setAttribute("style", "margin-top:8px");
			}
			//gwaleson.appendChild(br)
			gwaleson.appendChild(abtn);
		} else {
			console.log("no pro-get-button-box");
		}
	}

	function initAutoclick() {
		console.log("------- start initAutoclick ---------");
		var start = false;
		var freq = 200;
		freq = sessionStorage.getItem("freq");
		if(freq == "") {
			freq = 200
		};
		setInterval("CheckClick()", 100);
		AddBtn();
		Initlabel();
		console.log("spareSec:"+ProDet.reserObj.spareSec+",localTime:"+ProDet.reserObj.localTime+",releaseTime:"+ProDet.reserObj.releaseTime+",ProDet.reserObj.reserveTime:"+ProDet.reserObj.reserveTime);
		PProDet.btnIsEnable(ProDet.reserObj.$btn, false);
	}

	if(platformType == 2) {
		setTimeout(initAutoclick, 1000);
	} else {
		initAutoclick();
	}
}