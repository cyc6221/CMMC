---
layout: page
title: Math / OEIS
permalink: /math/oeis/
nav_kind: cards
nav_parent: pages/math.md
nav_title: OEIS
toc: false
---

{% assign oeis_entries = site.data.oeis | sort -%}
{% for oeis_entry in oeis_entries -%}
{% assign oeis_id = oeis_entry[0] %}
{% include oeis-card.html id=oeis_id notes=true %}
{% endfor %}
