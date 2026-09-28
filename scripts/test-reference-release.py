#!/usr/bin/env python3
"""Validate a rendered Reference and unchanged sales surfaces against a baseline build."""
import argparse,json
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(); self.ids=set(); self.links=[]; self.h1=0; self.canonical=[]; self.figures=0; self.schemas=[]; self.script=False; self.buffer=''; self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if tag=='figure' and 'reference-evidence' in a.get('class',''):self.figures+=1
  if tag=='script' and a.get('type')=='application/ld+json':self.script=True;self.buffer=''
 def handle_data(self,data):
  if self.script:self.buffer+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.script:self.schemas.append(json.loads(self.buffer));self.script=False
p=argparse.ArgumentParser();p.add_argument('build',type=Path);p.add_argument('baseline',type=Path);p.add_argument('slug');a=p.parse_args()
path='/reference/'+a.slug+'/'
text=(a.build/path.lstrip('/')/'index.html').read_text();page=Page(text)
assert page.h1==1, 'Expected one H1'
assert page.canonical==['https://akademi.eresbiotech.com'+path], 'Canonical mismatch'
assert {'Article','BreadcrumbList'} <= {s['@type'] for s in page.schemas}
assert page.figures==2, 'Missing evidence blocks'
for link in page.links:
 u=urlsplit(link)
 if not u.scheme and not u.netloc:
  if not u.path: target=page
  else:
   file=a.build/unquote(u.path).lstrip('/')
   if file.is_dir():file=file/'index.html'
   assert file.is_file(), 'Broken internal link: '+link
   target=Page(file.read_text()) if file.suffix=='.html' else None
  if u.fragment and target:assert unquote(u.fragment) in target.ids, 'Broken anchor: '+link
for route in ['index.html','reference/index.html','sitemap.xml']:
 assert path in (a.build/route).read_text(), 'Missing discovery entry: '+route
count=0
for folder in ['post','program-paketleri','ders-giris','bioexpo-2026-destekli-kayit']:
 for base in (a.baseline/folder).rglob('*.html'):
  rel=base.relative_to(a.baseline);assert base.read_bytes()==(a.build/rel).read_bytes(), 'Changed protected page: '+str(rel);count+=1
assert count>7
print(json.dumps({'reference':'PASS','internal_links':'PASS','schemas':'PASS','discovery':'PASS','protected_pages_unchanged':count},ensure_ascii=False))
