@echo off
cd /d "d:\downloads\portfolio webtite"
git add -A
git commit -m "Deploy to GitHub Pages"
git push origin main
pause