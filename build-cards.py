"""Generate browser-ready flashcard data from agent.md."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
lines = (ROOT / "agent.md").read_text(encoding="utf-8").splitlines()
cards = []
patterns = []
section = ""

for index, line in enumerate(lines):
    if line.startswith("## "):
        section = line[3:].strip()
    elif line.startswith("|") and section != "Useful Sentence Patterns":
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) == 3 and cells[0] not in ("Pinyin", "---------") and not set(cells[0]) <= {"-"}:
            cards.append({"category": section, "pinyin": cells[0], "hanzi": cells[1], "meaning": cells[2]})
    elif section == "Useful Sentence Patterns" and line.startswith("### "):
        title = re.sub(r"^\d+\.\s*", "", line[4:].strip())
        content = [value.strip() for value in lines[index + 1:index + 6] if value.strip()]
        if len(content) >= 3:
            patterns.append({
                "title": title,
                "pinyin": content[0].strip("*"),
                "hanzi": content[1],
                "meaning": content[2],
            })

output = "window.FLASHCARD_DATA = " + json.dumps(
    {"cards": cards, "patterns": patterns}, ensure_ascii=False, indent=2
) + ";\n"
(ROOT / "cards-data.js").write_text(output, encoding="utf-8")
print(f"Generated {len(cards)} cards and {len(patterns)} sentence patterns.")
