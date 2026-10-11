# Minute Mind

A local mental math website, with no accounts or backend. Test six skills, choose difficulty, review answer feedback, and track accuracy on a radar chart. Response times are reported separately. Results and partial sessions are saved in this browser using localStorage. JSON backups can be exported and imported; imports merge sessions and ignore duplicate IDs.

## Run

From this folder:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Open http://localhost:8080. Keep the same browser and address/port to access the same saved results. Clearing browser data or using private browsing can remove results. Export backups regularly. Do not run concurrent tests in different tabs: browser storage is shared and simultaneous saves can overwrite one another.

Mixed questions use multiplication before addition. Division questions have integer answers. Percentages may need decimals. Skipped questions count as incorrect; they are excluded from average answer time. The chart aggregates all recorded attempts, including partial sessions. It shows accuracy, not a composite of speed and accuracy. Unknown skills display a dash, and sit at zero on the chart until practiced.

No network connection is required for practice or storage. Google Fonts is optional; system fonts are used offline. This is a practice tool, not a validated cognitive assessment. No website has been published.

## Check core behavior

```powershell
node test-core.js
```
