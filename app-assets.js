/**
 * 本地图片资源路径（images/ 目录，与 Figma 导出文件名一致）
 */
(function (global) {
  "use strict";

  var I = "images/";

  function futureRing(num) {
    var n = Math.min(5, Math.max(1, parseInt(num, 10) || 1));
    return I + "虚线球" + n + ".png";
  }

  global.AppAssets = {
    base: I,
    avatarXia: I + "avatar-xia.png",
    avatarGou: I + "avatar-gou.png",
    navAppointmentOn: I + "预约.png",
    navAppointmentOff: I + "预约未点击.png",
    navScheduleOn: I + "接种时间表.png",
    navScheduleOff: I + "接种时间表未点击.png",
    navGrowthOn: I + "成长曲线.png",
    navGrowthOff: I + "成长曲线未点击.png",
    navProfileOn: I + "我的.png",
    navProfileOff: I + "我的未点击.png",
    statusBarLevels: I + "Levels.png",
    calendar: I + "日历.png",
    timeline: I + "针头.png",
    timelineActive: I + "针头.png",
    help: I + "科普问号.png",
    addVaccine: I + "加号.png",
    doseDone: I + "已种球.png",
    doseBooked: I + "预约球.png",
    futureRing: futureRing,
    arrowNext: I + "后一个.png",
    arrowPrev: I + "前一个.png",
    clinicRow: I + "接种门诊.png",
    addressRow: I + "详细地址.png",
    hoursRow: I + "营业时间.png",
    clinicUnit: I + "诊所.png",
    reminder: I + "提醒.png",
    childInfo: I + "孩子信息.png",
    share: I + "共享.png",
    heightIcon: I + "height.png",
    weightIcon: I + "weight.png",
    vaxDetailBack: I + "vax-detail-back.png",
    nextCardInner: I + "next-card-inner.svg",
    profilePillBg: I + "profile-pill-bg.svg"
  };
})(typeof window !== "undefined" ? window : globalThis);
