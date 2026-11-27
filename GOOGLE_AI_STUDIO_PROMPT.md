# Google AI Studio rebuild prompt

Rebuild and improve this dashboard as a polished, responsive sales analytics application for Almasor. Preserve the core information architecture: overview KPIs, province performance (Albay/Sorsogon/Masbate), FiberX, SME, BIDA, S2S, targets, run rates, SLI/JO records, grouping and raw data views. Use React, TypeScript, Recharts and a dark navy dashboard design with teal accent. Include filtering by province and month, robust loading/error/empty states, accessible controls, and CSV export.

**Data connection requirement:** connect to the linked Google Sheet only through a secure server-side integration (avoid exposing credentials or API keys in the browser). Implement a configurable Sheet ID and gid; use server-side Google Sheets API credentials or a documented public CSV export when the sheet is intentionally public. The cached values in this starter are dated 2026-09-22 and must be visibly labeled historical until live data is connected. Do not fabricate metrics.

Use the attached/original project archive as a reference for existing calculations, grouping, report logic, and table fields. Keep calculations in reusable modules with tests and compare results against source logic before replacing it.
