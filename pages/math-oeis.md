---
layout: page
title: Math / OEIS
permalink: /math/oeis/
nav_kind: cards
nav_parent: pages/math.md
nav_title: OEIS
toc: false
---

{% for oeis_entry in site.data.oeis -%}
{% assign oeis_id = oeis_entry[0] %}
{% include oeis-card.html id=oeis_id notes=true %}
{% endfor %}
