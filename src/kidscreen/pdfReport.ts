import type jsPDFType from "jspdf";
import type { ProfileReport } from "./scoring";
import { WHAT_HELPS } from "./whatHelps";

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

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function helpBlockHtml(scaleId: string) {
  const help = WHAT_HELPS[scaleId as keyof typeof WHAT_HELPS];
  if (!help) return "";

  const listen = help.listen
    .map((l) => escapeHtml(l.title))
    .join(" · ");

  return `
    <div style="margin-top:10px;padding-top:10px;border-top:1px solid #e2e8f0;">
      <div style="font-size:11px;font-weight:600;color:#0f172a;margin-bottom:6px;">Что поможет</div>
      ${
        listen
          ? `<div style="margin-bottom:5px;font-size:12px;color:#475569;"><strong>Послушать / почитать:</strong> ${listen}</div>`
          : ""
      }
      <div style="margin-bottom:5px;font-size:12px;color:#475569;"><strong>Попробовать:</strong> ${escapeHtml(help.tryTitle)}. ${escapeHtml(help.tryText)}</div>
      <div style="font-size:12px;color:#475569;"><strong>Следующий шаг:</strong> ${escapeHtml(help.nextStep)}</div>
    </div>`;
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
  container.style.boxSizing = "border-box";

  const date = new Date().toLocaleString("ru-RU");

  // Каждая сфера — атомарный блок: результат + пояснение + помощь
  const scalesHtml = profile.scales
    .map(
      (s) => `
      <div data-pdf-block style="border:1px solid #e2e8f0;border-radius:12px;padding:14px;margin-bottom:10px;break-inside:avoid;page-break-inside:avoid;">
        <div style="display:flex;justify-content:space-between;gap:12px;margin-bottom:6px;">
          <strong style="font-size:14px;">${escapeHtml(s.name)}</strong>
          <span style="color:${levelColor(s.level)};font-weight:600;font-size:12px;white-space:nowrap;">
            ${escapeHtml(s.levelLabel)} · T=${s.tValue}
          </span>
        </div>
        <div style="height:6px;background:#f1f5f9;border-radius:999px;overflow:hidden;margin-bottom:8px;">
          <div style="height:100%;width:${Math.max(4, Math.min(100, s.tValue))}%;background:${levelColor(s.level)};"></div>
        </div>
        <div style="color:#475569;font-size:12px;">${escapeHtml(s.text)}</div>
        ${helpBlockHtml(s.scaleId)}
      </div>`,
    )
    .join("");

  const qaHtml = sections
    .map((sec) => {
      const items = sec.questions
        .map((q, i) => {
          const ans = answers[q.id] ?? "—";
          return `
            <div data-pdf-block style="padding:8px 10px;border:1px solid #f1f5f9;border-radius:8px;margin-bottom:6px;break-inside:avoid;page-break-inside:avoid;">
              <div style="color:#0f172a;"><span style="color:#3b82f6;">${i + 1}.</span> ${escapeHtml(q.text)}</div>
              <div style="color:#475569;margin-top:3px;font-size:12px;"><strong>Ответ:</strong> ${escapeHtml(ans)}</div>
            </div>`;
        })
        .join("");
      return `
        <div data-pdf-block style="margin-top:14px;margin-bottom:4px;break-inside:avoid;">
          <h3 style="font-size:14px;margin:0;color:#0f172a;">${escapeHtml(sec.title)}</h3>
        </div>
        ${items}`;
    })
    .join("");

  container.innerHTML = `
    <div data-pdf-block style="border-bottom:2px solid #0f172a;padding-bottom:12px;margin-bottom:18px;">
      <div style="font-size:22px;font-weight:700;">KIDSCREEN — отчёт о самочувствии</div>
      <div style="color:#64748b;font-size:12px;margin-top:4px;">Сформировано: ${escapeHtml(date)}</div>
      <div style="color:#64748b;font-size:12px;">
        Возраст: ${escapeHtml(age || "—")} · Пол: ${escapeHtml(sex || "—")}
      </div>
    </div>

    <div data-pdf-block style="background:#f8fafc;border-radius:12px;padding:14px;margin-bottom:18px;">
      <div style="font-size:14px;font-weight:600;margin-bottom:4px;">Общий итог</div>
      ${profile.summary ? `<div style="color:#475569;">${escapeHtml(profile.summary)}</div>` : ""}
      <div style="color:#94a3b8;font-size:12px;margin-top:6px;">
        Общий T-индекс: ${profile.overallTValue}
      </div>
    </div>

    <div data-pdf-block style="margin:0 0 10px 0;">
      <h2 style="font-size:16px;margin:0;">Результаты по сферам</h2>
    </div>
    ${scalesHtml}

    <div data-pdf-block style="margin:22px 0 6px 0;">
      <h2 style="font-size:16px;margin:0;">Вопросы и ответы</h2>
    </div>
    <div data-pdf-block style="color:#94a3b8;font-size:12px;margin-bottom:8px;">
      Это упрощённый расчёт (без официальных норм KIDSCREEN A7_C). Используйте как ориентир, не как клинический диагноз.
    </div>
    ${qaHtml}
  `;

  document.body.appendChild(container);
  return container;
}

/** Границы атомарных блоков в координатах canvas (px). */
function measureBlockRanges(el: HTMLElement, scale: number) {
  const elRect = el.getBoundingClientRect();
  return Array.from(el.querySelectorAll<HTMLElement>("[data-pdf-block]")).map((block) => {
    const r = block.getBoundingClientRect();
    return {
      top: Math.round((r.top - elRect.top) * scale),
      bottom: Math.round((r.bottom - elRect.top) * scale),
    };
  });
}

/**
 * Точка разреза страницы: не режем внутри блока.
 * Если блок не влезает целиком — переносим его на следующую страницу.
 * Если блок выше страницы — режем по высоте страницы (крайний случай).
 */
function findPageBreak(
  pageStart: number,
  pageHeightPx: number,
  canvasHeight: number,
  blocks: { top: number; bottom: number }[],
): number {
  const idealEnd = pageStart + pageHeightPx;
  if (idealEnd >= canvasHeight) return canvasHeight;

  // Блок, который пересёк бы линию разреза
  const straddling = blocks.find((b) => b.top < idealEnd && b.bottom > idealEnd);

  if (straddling) {
    // Целиком на следующую страницу, если начало блока ещё на этой
    if (straddling.top > pageStart + 8) {
      return straddling.top;
    }
    // Блок выше страницы — вынужденный разрез
    return idealEnd;
  }

  // Режем по концу последнего полностью вместившегося блока (чистый край)
  let lastFullyVisibleBottom = pageStart;
  for (const b of blocks) {
    if (b.top >= pageStart && b.bottom <= idealEnd) {
      lastFullyVisibleBottom = Math.max(lastFullyVisibleBottom, b.bottom);
    }
  }

  // Если есть «хвост» пустого места после последнего блока — можно резать по idealEnd,
  // иначе по низу последнего блока (без обрезки следующей строки).
  if (lastFullyVisibleBottom > pageStart) {
    // Небольшой зазор после блока, но не дальше idealEnd
    return Math.min(idealEnd, lastFullyVisibleBottom + 4);
  }

  return idealEnd;
}

export async function generateReportPdf(args: BuildArgs): Promise<void> {
  const el = buildHtml(args);
  try {
    const A4_W = 210;
    const A4_H = 297;
    // Увеличенные поля, чтобы нижние строки не съедались при нарезке/рендере
    const MARGIN_X = 14;
    const MARGIN_TOP = 14;
    const MARGIN_BOTTOM = 18;
    const CONTENT_W = A4_W - MARGIN_X * 2;
    const CONTENT_H = A4_H - MARGIN_TOP - MARGIN_BOTTOM;

    const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
      import("jspdf"),
      import("html2canvas"),
    ]);

    const pdf: jsPDFType = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const SCALE = 1.5;

    // Замеры до canvas — пока элемент в DOM
    const blocks = measureBlockRanges(el, SCALE);

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
      const breakAt = findPageBreak(offset, pageHeightPx, canvas.height, blocks);
      const h = Math.max(1, breakAt - offset);

      slice.height = h;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, slice.width, h);
        ctx.drawImage(canvas, 0, offset, canvas.width, h, 0, 0, canvas.width, h);
      }

      if (!first) pdf.addPage();
      first = false;

      pdf.addImage(
        slice.toDataURL("image/jpeg", 0.85),
        "JPEG",
        MARGIN_X,
        MARGIN_TOP,
        CONTENT_W,
        h / pxPerMM,
        undefined,
        "FAST",
      );

      offset = breakAt;
    }

    pdf.save(`kidscreen-report-${new Date().toISOString().slice(0, 10)}.pdf`);
  } finally {
    el.remove();
  }
}
