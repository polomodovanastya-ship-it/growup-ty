import type jsPDFType from "jspdf";
import type { ProfileReport } from "./scoring";

interface QuestionLite {
  id: string;
  text: string;
  scale: string[];
}
interface SectionLite {
  title: string;
  questions: QuestionLite[];
}

interface BuildArgs {
  profile: ProfileReport;
  answers: Record<string, string>;
  sections: SectionLite[];
  age?: string;
  sex?: string;
}

function levelColor(level: string) {
  switch (level) {
    case "low":
      return "#dc2626";
    case "below_avg":
      return "#f59e0b";
    case "average":
      return "#3b82f6";
    case "high":
      return "#16a34a";
    default:
      return "#64748b";
  }
}

function buildHtml({ profile, answers, sections, age, sex }: BuildArgs): HTMLElement {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.width = "794px"; // ~A4 @ 96dpi
  container.style.padding = "40px";
  container.style.background = "#ffffff";
  container.style.color = "#0f172a";
  container.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
  container.style.fontSize = "13px";
  container.style.lineHeight = "1.5";

  const date = new Date().toLocaleString("ru-RU");

  const scalesHtml = profile.scales
    .map(
      (s) => `
      <div data-pdf-section style="border:1px solid #e2e8f0;border-radius:12px;padding:14px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;gap:12px;margin-bottom:6px;">
          <strong style="font-size:14px;">${s.name}</strong>
          <span style="color:${levelColor(s.level)};font-weight:600;font-size:12px;white-space:nowrap;">
            ${s.levelLabel} · T=${s.tValue}
          </span>
        </div>
        <div style="height:6px;background:#f1f5f9;border-radius:999px;overflow:hidden;margin-bottom:8px;">
          <div style="height:100%;width:${Math.max(4, s.tValue)}%;background:${levelColor(s.level)};"></div>
        </div>
        <div style="color:#475569;font-size:12px;">${s.text}</div>
      </div>`,
    )
    .join("");

  const qaHtml = sections
    .map((sec) => {
      const items = sec.questions
        .map((q, i) => {
          const ans = answers[q.id] ?? "—";
          return `
            <div data-pdf-section style="padding:8px 10px;border:1px solid #f1f5f9;border-radius:8px;margin-bottom:6px;">
              <div style="color:#0f172a;"><span style="color:#3b82f6;">${i + 1}.</span> ${q.text}</div>
              <div style="color:#475569;margin-top:3px;font-size:12px;"><strong>Ответ:</strong> ${ans}</div>
            </div>`;
        })
        .join("");
      return `
        <div data-pdf-section style="margin-top:14px;">
          <h3 style="font-size:14px;margin:0 0 8px 0;color:#0f172a;">${sec.title}</h3>
        </div>
        ${items}`;
    })
    .join("");

  const supportBlock =
    profile.supportAreas.length > 0
      ? `<div data-pdf-section style="margin-top:14px;border:1px solid #fecaca;background:#fef2f2;border-radius:12px;padding:12px;">
          <strong>Сферы, которые просят поддержки:</strong> ${profile.supportAreas.join(", ")}.
        </div>`
      : "";

  container.innerHTML = `
    <div data-pdf-section style="border-bottom:2px solid #0f172a;padding-bottom:12px;margin-bottom:18px;">
      <div style="font-size:22px;font-weight:700;">KIDSCREEN — отчёт о самочувствии</div>
      <div style="color:#64748b;font-size:12px;margin-top:4px;">Сформировано: ${date}</div>
      <div style="color:#64748b;font-size:12px;">
        Возраст: ${age || "—"} · Пол: ${sex || "—"}
      </div>
    </div>

    <div data-pdf-section style="background:#f8fafc;border-radius:12px;padding:14px;margin-bottom:18px;">
      <div style="font-size:14px;font-weight:600;margin-bottom:4px;">Общий итог</div>
      ${profile.summary ? `<div style="color:#475569;">${profile.summary}</div>` : ""}
      <div style="color:#94a3b8;font-size:12px;margin-top:6px;">
        Общий T-индекс: ${profile.overallTValue}
      </div>
    </div>

    <h2 data-pdf-section style="font-size:16px;margin:0 0 10px 0;">Результаты по сферам</h2>
    ${scalesHtml}
    ${supportBlock}

    <h2 data-pdf-section style="font-size:16px;margin:22px 0 6px 0;">Вопросы и ответы</h2>
    <div data-pdf-section style="color:#94a3b8;font-size:12px;margin-bottom:6px;">
      Это упрощённый расчёт (без официальных норм KIDSCREEN A7_C). Используйте как ориентир, не как клинический диагноз.
    </div>
    ${qaHtml}
  `;

  document.body.appendChild(container);
  return container;
}

export async function generateReportPdf(args: BuildArgs): Promise<void> {
  const el = buildHtml(args);
  try {
    const A4_W = 210;
    const A4_H = 297;
    const MARGIN = 12;
    const CONTENT_W = A4_W - MARGIN * 2;
    const CONTENT_H = A4_H - MARGIN * 2;

    // Библиотеки грузим только по клику — страница остаётся лёгкой.
    const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
      import("jspdf"),
      import("html2canvas"),
    ]);

    const pdf: jsPDFType = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });

    // Один общий рендер вместо десятков — на порядок быстрее.
    const SCALE = 1.5;
    const canvas = await html2canvas(el, {
      scale: SCALE,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      removeContainer: true,
      imageTimeout: 0,
    });

    const pxPerMM = canvas.width / CONTENT_W;
    const pageHeightPx = Math.floor(CONTENT_H * pxPerMM);

    const slice = document.createElement("canvas");
    const ctx = slice.getContext("2d");
    slice.width = canvas.width;

    let offset = 0;
    let first = true;
    while (offset < canvas.height) {
      const h = Math.min(pageHeightPx, canvas.height - offset);
      slice.height = h;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, slice.width, h);
        ctx.drawImage(canvas, 0, offset, canvas.width, h, 0, 0, canvas.width, h);
      }
      if (!first) pdf.addPage();
      first = false;
      pdf.addImage(
        slice.toDataURL("image/jpeg", 0.8),
        "JPEG",
        MARGIN,
        MARGIN,
        CONTENT_W,
        h / pxPerMM,
        undefined,
        "FAST",
      );
      offset += h;
    }

    pdf.save(`kidscreen-report-${new Date().toISOString().slice(0, 10)}.pdf`);
  } finally {
    el.remove();
  }
}
