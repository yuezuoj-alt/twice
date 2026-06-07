/**
 * 将 HTML 中失效的 Figma 图片链接批量替换为 images/ 本地资源
 * 用法: node scripts/patch-figma-images.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));

const NAV_OFF_ON = {
  appointment: ["images/预约off.png", "images/预约on.png"],
  schedule: ["images/表off.png", "images/表on.png"],
  growth: ["images/成长off.png", "images/成长on.png"],
  profile: ["images/我的off.png", "images/我的on.png"]
};

const SIMPLE = [
  [/https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+/g, ""] // placeholder - handled below
];

function patchNavBlock(html) {
  return html.replace(
    /<button class="nav-item([^"]*)"([^>]*data-nav="(appointment|schedule|growth|profile)"[^>]*)>([\s\S]*?)<\/button>/g,
    (full, extraClass, rest, navId, inner) => {
      const active = /nav-item\s+active|nav-item active/.test(full) || /class="[^"]*active[^"]*"/.test(rest);
      const src = NAV_OFF_ON[navId][active ? 1 : 0];
      const newInner = inner.replace(
        /src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+"/,
        'src="' + src + '"'
      );
      return full.replace(inner, newInner);
    }
  );
}

const MAP = {
  syringe: "images/针头.png",
  help: "images/科普问号.png",
  plus: "images/加号.png",
  add: "images/加号.png",
  chevron: "images/后一个.png",
  arrow: "images/后一个.png",
  back: "images/前一个.png",
  clinic: "images/接种门诊.png",
  address: "images/详细地址.png",
  hours: "images/营业时间.png",
  unit: "images/诊所.png",
  childInfo: "images/孩子信息.png",
  share: "images/共享.png",
  reminder: "images/提醒.png",
  avatar: "images/avatar-xia.png",
  avatarLarge: "images/avatar-xia.png",
  vaxBack: "images/vax-detail-back.png"
};

function patchFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  if (!html.includes("figma.com/api/mcp/asset")) return false;

  html = patchNavBlock(html);

  const rules = [
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*28d3d8b8[^"]*"/g, 'src="images/后一个.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*cbf48d68[^"]*"/g, 'src="images/后一个.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*adf89a46[^"]*"/g, 'src="images/后一个.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*6477ffb8[^"]*"/g, 'src="images/接种门诊.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*9250dd6a[^"]*"/g, 'src="images/详细地址.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*62f006a9[^"]*"/g, 'src="images/营业时间.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*6803fe38[^"]*"/g, 'src="images/加号.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*7bbbd247[^"]*"/g, 'src="images/加号.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*9be92fb6[^"]*"/g, 'src="images/前一个.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*dc33b150[^"]*"/g, 'src="images/avatar-xia.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*fc25fdfe[^"]*"/g, 'src="images/avatar-xia.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*66526b70[^"]*"/g, 'src="images/avatar-xia.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*5d99d95d[^"]*"/g, 'src="images/avatar-xia.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*1196ddbb[^"]*"/g, 'src="images/avatar-xia.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*fa1d1ac6[^"]*"/g, 'src="images/avatar-xia.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*b23258e6[^"]*"/g, ''],
    [/class="inner-bg" src=""/g, 'class="inner-bg" aria-hidden="true"'],
    [/syringe:\s*"https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+"/g, 'syringe: "images/针头.png"'],
    [/help:\s*"https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+"/g, 'help: "images/科普问号.png"'],
    [/plus:\s*"https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+"/g, 'plus: "images/加号.png"'],
    [/avatar1:\s*"https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+"/g, 'avatar1: "images/avatar-xia.png"'],
    [/avatar2:\s*"https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+"/g, 'avatar2: "images/avatar-gou.png"'],
    [/radioSelected:\s*"https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+"/g, 'radioSelected: ""'],
    [/radioUnselected:\s*"https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+"/g, 'radioUnselected: ""'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*vax-detail[^"]*"/gi, 'src="images/vax-detail-back.png"'],
    [/src="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]*2d8e9ece[^"]*"/g, 'src="images/前一个.png"']
  ];

  rules.forEach(([re, rep]) => {
    html = html.replace(re, rep);
  });

  // 移除仍指向 Figma 的 img（状态栏等无本地资源）
  html = html.replace(
    /<img([^>]*)\ssrc="https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"]+"([^>]*)>/g,
    ""
  );

  // 移除空 pill-bg / inner-bg 标签
  html = html.replace(/<img class="pill-bg" src="" alt="" \/>/g, "");
  html = html.replace(/<img[^>]*class="inner-bg"[^>]*\/>/g, "");

  fs.writeFileSync(filePath, html, "utf8");
  return true;
}

files.forEach((f) => {
  const p = path.join(root, f);
  if (f === "index.html") return; // already patched manually
  if (patchFile(p)) console.log("patched", f);
});

console.log("done");
