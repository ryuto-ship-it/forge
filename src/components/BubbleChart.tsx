"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface BubbleToken {
  id: string;
  ticker: string;
  name: string;
  marketCap: number;  // raw number for sizing
  change: number;     // % change
  type: "hot" | "charity" | "agent" | "normal";
  image: string;
}

const BUBBLE_TOKENS: BubbleToken[] = [
  { id:"b1",  ticker:"TROLL",  name:"TrollKing",   marketCap:117_000_000, change:28,    type:"hot",     image:"https://picsum.photos/seed/troll/80"   },
  { id:"b2",  ticker:"MAGA",   name:"MAGA Coin",   marketCap:88_000_000,  change:280,   type:"hot",     image:"https://picsum.photos/seed/maga/80"    },
  { id:"b3",  ticker:"PUMP",   name:"PumpMax",     marketCap:33_000_000,  change:190,   type:"hot",     image:"https://picsum.photos/seed/pump/80"    },
  { id:"b4",  ticker:"GOBLIN", name:"GoblinCoin",  marketCap:20_600_000,  change:340,   type:"hot",     image:"https://picsum.photos/seed/goblin/80"  },
  { id:"b5",  ticker:"BOOB",   name:"BoobCoin",    marketCap:6_700_000,   change:0.1,   type:"charity", image:"https://picsum.photos/seed/boob/80"    },
  { id:"b6",  ticker:"HANTA",  name:"Hantavirus",  marketCap:3_310_000,   change:180,   type:"agent",   image:"https://picsum.photos/seed/hanta/80"   },
  { id:"b7",  ticker:"PEPE2",  name:"Pepe 2.0",    marketCap:512_000,     change:67,    type:"normal",  image:"https://picsum.photos/seed/pepe2/80"   },
  { id:"b8",  ticker:"SKYNET", name:"SkyNet AI",   marketCap:2_100_000,   change:145,   type:"agent",   image:"https://picsum.photos/seed/skynet/80"  },
  { id:"b9",  ticker:"NEURAL", name:"Neural Net",  marketCap:810_000,     change:92,    type:"agent",   image:"https://picsum.photos/seed/neural/80"  },
  { id:"b10", ticker:"WISH",   name:"Make A Wish", marketCap:250_000,     change:-2.3,  type:"charity", image:"https://picsum.photos/seed/wish/80"    },
  { id:"b11", ticker:"ALPHA",  name:"AlphaBot",    marketCap:5_500_000,   change:213,   type:"agent",   image:"https://picsum.photos/seed/alpha/80"   },
  { id:"b12", ticker:"DEGEN",  name:"DegenDAO",    marketCap:1_200_000,   change:-45,   type:"normal",  image:"https://picsum.photos/seed/degen/80"   },
  { id:"b13", ticker:"CHAOS",  name:"Chaos Token", marketCap:44_000,      change:520,   type:"normal",  image:"https://picsum.photos/seed/chaos/80"   },
  { id:"b14", ticker:"FROG",   name:"FrogCoin",    marketCap:8_000,       change:1200,  type:"normal",  image:"https://picsum.photos/seed/frog/80"    },
  { id:"b15", ticker:"PUNCH",  name:"PunchToken",  marketCap:3_020_000,   change:0.1,   type:"charity", image:"https://picsum.photos/seed/punch/80"   },
];

function getBubbleColor(token: BubbleToken): string {
  if (token.type === "agent")   return "#00FFE5";
  if (token.type === "charity") return "#FF6B6B";
  if (token.change >= 20)  return "#F5A623";
  if (token.change > 0)   return "#c97e1a";
  return "#FF3B3B";
}

interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  ticker: string;
  name: string;
  marketCap: number;
  change: number;
  type: "hot" | "charity" | "agent" | "normal";
  image: string;
  radius: number;
  color: string;
  pulseScale?: number;
}

export default function BubbleChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; token: BubbleToken } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 480 });

  // Observe container size
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;
      setDimensions({ width: rect.width || 600, height: rect.height || 480 });
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    if (!svgRef.current || width < 100) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Radius scale
    const maxMcap = d3.max(BUBBLE_TOKENS, d => d.marketCap) ?? 1;
    const rScale = d3.scaleSqrt().domain([0, maxMcap]).range([18, Math.min(width, height) * 0.22]);

    const nodes: SimNode[] = BUBBLE_TOKENS.map(t => ({
      ...t,
      radius: rScale(t.marketCap),
      color: getBubbleColor(t),
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100,
    }));

    // Defs for clip paths and glow
    const defs = svg.append("defs");

    // Glow filter
    const filter = defs.append("filter").attr("id", "bubble-glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur");
    const merge = filter.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    // Per-token clip paths for images
    nodes.forEach(node => {
      defs.append("clipPath")
        .attr("id", `clip-${node.id}`)
        .append("circle")
        .attr("r", node.radius - 4);
    });

    // Force simulation
    const simulation = d3.forceSimulation(nodes)
      .force("charge",    d3.forceManyBody().strength(-20))
      .force("center",    d3.forceCenter(width / 2, height / 2).strength(0.08))
      .force("collision", d3.forceCollide<SimNode>(d => d.radius + 3).strength(0.85))
      .force("x",         d3.forceX(width / 2).strength(0.04))
      .force("y",         d3.forceY(height / 2).strength(0.04))
      .alphaDecay(0.015)
      .velocityDecay(0.4);

    // Bubble groups
    const bubbleG = svg.append("g").attr("class", "bubbles");

    const groups = bubbleG.selectAll("g.bubble")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "bubble")
      .style("cursor", "pointer")
      .on("mouseenter", function(event, d) {
        d3.select(this).select("circle.bg")
          .attr("filter", "url(#bubble-glow)")
          .attr("stroke-width", "2.5");
        const rect = svgRef.current!.getBoundingClientRect();
        setTooltip({ x: event.clientX - rect.left, y: event.clientY - rect.top, token: d });
      })
      .on("mousemove", function(event) {
        const rect = svgRef.current!.getBoundingClientRect();
        setTooltip(prev => prev ? { ...prev, x: event.clientX - rect.left, y: event.clientY - rect.top } : null);
      })
      .on("mouseleave", function() {
        d3.select(this).select("circle.bg")
          .attr("filter", null)
          .attr("stroke-width", "1.5");
        setTooltip(null);
      });

    // Outer glow ring for hot tokens
    groups.filter(d => d.type === "hot").append("circle")
      .attr("r", d => d.radius + 6)
      .attr("fill", "none")
      .attr("stroke", d => d.color)
      .attr("stroke-width", 1)
      .attr("opacity", 0.2);

    // Main bubble circle
    groups.append("circle")
      .attr("class", "bg")
      .attr("r", d => d.radius)
      .attr("fill", d => d.color + "22")
      .attr("stroke", d => d.color)
      .attr("stroke-width", "1.5")
      .attr("opacity", 0.95);

    // Token image (clipped to circle)
    groups.append("image")
      .attr("href", d => d.image)
      .attr("x", d => -d.radius + 4)
      .attr("y", d => -d.radius + 4)
      .attr("width", d => (d.radius - 4) * 2)
      .attr("height", d => (d.radius - 4) * 2)
      .attr("clip-path", d => `url(#clip-${d.id})`)
      .attr("preserveAspectRatio", "xMidYMid slice")
      .attr("opacity", 0.55);

    // Color overlay
    groups.append("circle")
      .attr("r", d => d.radius - 4)
      .attr("fill", d => d.color + "18")
      .attr("pointer-events", "none");

    // Type icon
    groups.filter(d => d.type === "agent" || d.type === "charity").append("text")
      .attr("text-anchor", "middle")
      .attr("dy", d => -d.radius * 0.35)
      .attr("font-size", d => Math.max(10, d.radius * 0.32))
      .text(d => d.type === "agent" ? "🤖" : "💚");

    // Ticker text
    groups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", d => (d.type === "agent" || d.type === "charity") ? d.radius * 0.12 : -d.radius * 0.08)
      .attr("font-family", "'Departure Mono', monospace")
      .attr("font-size", d => Math.max(8, Math.min(d.radius * 0.28, 14)))
      .attr("font-weight", "bold")
      .attr("fill", d => d.color)
      .attr("pointer-events", "none")
      .text(d => `$${d.ticker}`);

    // Change % text
    groups.filter(d => d.radius > 30).append("text")
      .attr("text-anchor", "middle")
      .attr("dy", d => (d.type === "agent" || d.type === "charity") ? d.radius * 0.42 : d.radius * 0.32)
      .attr("font-family", "'Departure Mono', monospace")
      .attr("font-size", d => Math.max(7, Math.min(d.radius * 0.22, 11)))
      .attr("fill", d => d.change >= 0 ? "#ffffff" : "#FF6B6B")
      .attr("opacity", 0.9)
      .attr("pointer-events", "none")
      .text(d => `${d.change >= 0 ? "+" : ""}${d.change}%`);

    // Simulation tick
    simulation.on("tick", () => {
      groups.attr("transform", d => {
        // Clamp within bounds
        d.x = Math.max(d.radius + 4, Math.min(width - d.radius - 4, d.x ?? width / 2));
        d.y = Math.max(d.radius + 4, Math.min(height - d.radius - 4, d.y ?? height / 2));
        return `translate(${d.x},${d.y})`;
      });
    });

    // Periodic random "trade" pulse on a random bubble
    const pulseInterval = setInterval(() => {
      const node = nodes[Math.floor(Math.random() * nodes.length)];
      const isBuy = Math.random() > 0.4;
      const pulseColor = isBuy ? "#F5A623" : "#FF3B3B";
      const targetGroup = groups.filter(d => d.id === node.id);

      targetGroup.select("circle.bg")
        .transition().duration(200)
        .attr("stroke", pulseColor)
        .attr("stroke-width", "3")
        .attr("r", node.radius * 1.06)
        .transition().duration(400)
        .attr("stroke", node.color)
        .attr("stroke-width", "1.5")
        .attr("r", node.radius);
    }, 2000);

    // Add new bubble from bottom every 15s
    let newTokenCounter = 100;
    const newBubbleInterval = setInterval(() => {
      newTokenCounter++;
      const newNode: SimNode = {
        id: `new-${newTokenCounter}`,
        ticker: `NEW${newTokenCounter}`,
        name: "New Token",
        marketCap: Math.random() * 50_000,
        change: Math.random() * 800 + 50,
        type: "normal",
        image: `https://picsum.photos/seed/${newTokenCounter}/80`,
        radius: rScale(Math.random() * 50_000),
        color: "#F5A623",
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height + 50,
      };
      nodes.push(newNode);

      // Add clip path
      defs.append("clipPath")
        .attr("id", `clip-${newNode.id}`)
        .append("circle").attr("r", newNode.radius - 4);

      // Add bubble group
      const newGroup = bubbleG.append("g")
        .attr("class", "bubble")
        .attr("transform", `translate(${newNode.x},${newNode.y})`)
        .style("cursor", "pointer")
        .style("opacity", "0");

      newGroup.append("circle")
        .attr("class", "bg")
        .attr("r", newNode.radius)
        .attr("fill", "#F5A62322")
        .attr("stroke", "#F5A623")
        .attr("stroke-width", "1.5");

      newGroup.append("text")
        .attr("text-anchor", "middle").attr("dy", "-4")
        .attr("font-family", "'Departure Mono', monospace")
        .attr("font-size", Math.max(8, newNode.radius * 0.28))
        .attr("font-weight", "bold")
        .attr("fill", "#F5A623")
        .text(`$N${newTokenCounter}`);

      newGroup.append("text")
        .attr("text-anchor", "middle").attr("dy", "10")
        .attr("font-family", "'Departure Mono', monospace")
        .attr("font-size", 9)
        .attr("fill", "#ffffff").attr("opacity", 0.8)
        .text("NEW");

      newGroup.transition().duration(600).style("opacity", "1");
      simulation.nodes(nodes).alpha(0.3).restart();
    }, 15000);

    return () => {
      simulation.stop();
      clearInterval(pulseInterval);
      clearInterval(newBubbleInterval);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "480px",
        position: "relative",
        background: "linear-gradient(135deg, #0d0d0d 0%, #0a0a0a 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        position: "absolute", top: "14px", left: "16px", zIndex: 5,
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span style={{ fontFamily: "'Departure Mono', monospace", fontSize: "11px", color: "#F5A623", letterSpacing: "0.1em" }}>
          ◎ MARKET BUBBLES
        </span>
        <span style={{
          fontFamily: "'Departure Mono', monospace", fontSize: "9px",
          color: "#444", background: "#1A1A1A", padding: "2px 6px", borderRadius: "4px",
        }}>
          SIZE = MCAP
        </span>
      </div>

      {/* SVG */}
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ display: "block", width: "100%", height: "100%" }}
      />

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "absolute",
          left: tooltip.x + 14,
          top: tooltip.y - 50,
          background: "#1A1A1A",
          border: "1px solid rgba(245,166,35,0.3)",
          borderRadius: "8px",
          padding: "8px 12px",
          pointerEvents: "none",
          zIndex: 20,
          minWidth: "140px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}>
          <div style={{ fontFamily: "'Departure Mono', monospace", fontSize: "12px", fontWeight: "bold", color: "#F5A623" }}>
            ${tooltip.token.ticker}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#888", marginBottom: "4px" }}>
            {tooltip.token.name}
          </div>
          <div style={{ fontFamily: "'Departure Mono', monospace", fontSize: "11px", color: "#ffffff" }}>
            ${(tooltip.token.marketCap / 1_000_000).toFixed(2)}M
          </div>
          <div style={{
            fontFamily: "'Departure Mono', monospace", fontSize: "11px",
            color: tooltip.token.change >= 0 ? "#F5A623" : "#FF3B3B",
          }}>
            {tooltip.token.change >= 0 ? "+" : ""}{tooltip.token.change}%
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{
        position: "absolute", bottom: "12px", right: "14px", zIndex: 5,
        display: "flex", gap: "12px", alignItems: "center",
      }}>
        {[
          { color: "#F5A623", label: "Bullish" },
          { color: "#FF3B3B", label: "Bearish" },
          { color: "#00FFE5", label: "AI Agent" },
          { color: "#FF6B6B", label: "Charity" },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: l.color }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#555" }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
