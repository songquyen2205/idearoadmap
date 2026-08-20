document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPainpoints();
  initDddFlows();
  initFaqs();
  initGlossary();
  initGlobalSearch();
  initAiRoadmap();
  initWhatsAppSync();
  initDatabaseErd();
});

// 1. SIDEBAR NAVIGATION
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.content-section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active from all items
      navItems.forEach(nav => nav.classList.remove('active'));
      // Add active to clicked item
      item.classList.add('active');

      // Get target section id
      const targetId = item.getAttribute('data-target');

      // Hide all sections
      sections.forEach(sec => sec.classList.remove('active'));
      // Show target section
      const targetSec = document.getElementById(`sec-${targetId}`);
      if (targetSec) {
        targetSec.classList.add('active');
      }
    });
  });
}

// 2. WIDGET: PAINPOINTS & CAPABILITIES
function initPainpoints() {
  const tabsContainer = document.getElementById('actor-tabs-container');
  const gridContainer = document.getElementById('painpoints-grid-container');

  if (!tabsContainer || !gridContainer) return;

  // Render Tabs
  HAMMER_DATA.painpoints.forEach((actorData, idx) => {
    const tab = document.createElement('div');
    tab.className = `actor-tab ${idx === 0 ? 'active' : ''}`;
    tab.setAttribute('data-actor', actorData.actor);
    tab.innerHTML = `<span>${actorData.icon}</span> ${actorData.actorName}`;
    tabsContainer.appendChild(tab);

    tab.addEventListener('click', () => {
      document.querySelectorAll('.actor-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderActorCards(actorData.actor);
    });
  });

  // Render initial actor cards
  if (HAMMER_DATA.painpoints.length > 0) {
    renderActorCards(HAMMER_DATA.painpoints[0].actor);
  }

  // Render Business Capability Map
  renderCapabilityMap();

  function renderActorCards(actor) {
    gridContainer.innerHTML = '';
    const actorData = HAMMER_DATA.painpoints.find(p => p.actor === actor);
    if (!actorData) return;

    actorData.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'painpoint-card';
      card.innerHTML = `
        <div class="painpoint-header">${item.title}</div>
        
        <div class="painpoint-block">
          <span class="badge danger">Nỗi đau (Painpoint)</span>
          <div class="block-text">${item.painpoint}</div>
        </div>
        
        <div class="solution-block">
          <span class="badge success">Giải pháp (Solution)</span>
          <div class="block-text">${item.solution}</div>
        </div>
        
        <div class="tech-block">
          <span class="badge tech">Tác động kỹ thuật</span>
          <div class="block-text">${item.tech}</div>
          <div style="margin-top: 8px;">
            <a href="${item.file_link}" class="code-link">
              📂 ${item.file_link.split('/').pop()}
            </a>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }

  function renderCapabilityMap() {
    const diagramContainer = document.getElementById('capability-diagram-container');
    const listContainer = document.getElementById('capability-list-container');
    
    if (!diagramContainer || !listContainer) return;
    
    // Set local SVG path for capability map
    diagramContainer.innerHTML = `
      <img src="../images/capability_map.svg" class="diagram-image" alt="Capability Map">
      <div class="diagram-caption">Hammer Business Capability Map</div>
    `;
    
    listContainer.innerHTML = '';
    HAMMER_DATA.capabilities.list.forEach(cap => {
      const item = document.createElement('div');
      item.innerHTML = `
        <strong style="color: #fff; display: block; margin-bottom: 4px; font-size: 14px;">${cap.title}</strong>
        <span style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; display: block;">${cap.desc}</span>
      `;
      listContainer.appendChild(item);
    });
  }
}

// 3. WIDGET: DDD DOMAIN EVENT FLOWS & TIMELINE
function initDddFlows() {
  const tabsContainer = document.getElementById('flow-tabs-container');
  const stepsContainer = document.getElementById('timeline-steps-container');
  const detailContainer = document.getElementById('timeline-detail-container');
  const diagramContainer = document.getElementById('flow-diagram-container');

  if (!tabsContainer || !stepsContainer || !detailContainer || !diagramContainer) return;

  // Render Flow Tabs
  HAMMER_DATA.ddd_flows.forEach((flow, idx) => {
    const tab = document.createElement('button');
    tab.className = `flow-tab ${idx === 0 ? 'active' : ''}`;
    tab.innerText = flow.title;
    tabsContainer.appendChild(tab);

    tab.addEventListener('click', () => {
      document.querySelectorAll('.flow-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderFlowTimeline(flow);
    });
  });

  // Render initial timeline
  if (HAMMER_DATA.ddd_flows.length > 0) {
    renderFlowTimeline(HAMMER_DATA.ddd_flows[0]);
  }

  function renderFlowTimeline(flow) {
    stepsContainer.innerHTML = '';
    
    // Render diagram using local SVG path
    diagramContainer.innerHTML = `
      <img src="../images/${flow.id}_flow.svg" class="diagram-image" alt="${flow.title}">
      <div class="diagram-caption">Sơ đồ tương tác luồng ${flow.title}</div>
    `;

    flow.events.forEach((evt, idx) => {
      const step = document.createElement('div');
      step.className = `timeline-step-node ${idx === 0 ? 'active' : ''}`;
      step.innerHTML = `
        <div class="step-node-name">⚡ ${evt.name}</div>
        <div class="step-node-trigger">${evt.trigger.substring(0, 70)}${evt.trigger.length > 70 ? '...' : ''}</div>
      `;
      stepsContainer.appendChild(step);

      step.addEventListener('click', () => {
        document.querySelectorAll('.timeline-step-node').forEach(n => n.classList.remove('active'));
        step.classList.add('active');
        renderEventDetail(evt);
      });
    });

    // Render initial event detail
    if (flow.events.length > 0) {
      renderEventDetail(flow.events[0]);
    }
  }

  function renderEventDetail(evt) {
    detailContainer.innerHTML = `
      <div class="detail-card">
        <div class="detail-header">
          <div class="detail-event-title">⚡ ${evt.name}</div>
        </div>
        
        <div class="detail-block">
          <div class="detail-label">Tác nhân kích hoạt (Trigger)</div>
          <div class="detail-val">${evt.trigger}</div>
        </div>
        
        <div class="detail-block">
          <div class="detail-label">Thay đổi trạng thái CSDL</div>
          <div class="detail-val" style="color: #cbd5e1;">${evt.state_change}</div>
        </div>
        
        <div class="detail-block">
          <div class="detail-label">Model xử lý (Technical)</div>
          <div class="detail-val">
            <a href="${evt.model_url}" class="code-link">
              📂 ${evt.model}
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

// 4. WIDGET: FAQS & CORE RULES
function initFaqs() {
  const faqContainer = document.getElementById('faq-list-container');
  const rulesContainer = document.getElementById('core-rules-container');

  if (rulesContainer) {
    rulesContainer.innerHTML = '';
    HAMMER_DATA.core_rules.forEach(rule => {
      const card = document.createElement('div');
      card.className = 'painpoint-card';
      
      let pointsHtml = rule.points.map(pt => `<li style="margin-bottom: 8px;">${pt}</li>`).join('');
      
      card.innerHTML = `
        <div class="painpoint-header" style="color: #c084fc; font-size: 15px;">${rule.title}</div>
        <div class="block-text" style="margin-top: 12px; margin-bottom: 12px;">
          <ul style="padding-left: 18px; color: var(--text-secondary); line-height: 1.6; font-size: 13px;">
            ${pointsHtml}
          </ul>
        </div>
        <div style="border-top: 1px solid var(--border-color); padding-top: 10px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 11px; color: var(--text-muted);">Mã nguồn rà soát:</span>
          <a href="${rule.code_link}" class="code-link">📂 ${rule.filename}</a>
        </div>
      `;
      rulesContainer.appendChild(card);
    });
  }

  if (faqContainer) {
    faqContainer.innerHTML = '';
    HAMMER_DATA.faqs.forEach((faq, idx) => {
      const item = document.createElement('div');
      item.className = 'faq-item';
      item.innerHTML = `
        <div class="faq-question">
          <span class="faq-q-text">❓ ${faq.q}</span>
          <span class="faq-toggle-icon">▼</span>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            <p style="margin-bottom: 12px; color: var(--text-primary); font-size: 14px;">${faq.a}</p>
            <div class="tech-insight-box">
              <div class="tech-insight-title">Trace mã nguồn thực tế</div>
              <p style="color: var(--text-secondary); margin-bottom: 6px;">
                Quy tắc này được quy định trực tiếp trong file:
              </p>
              <a href="${faq.model_url}" class="code-link">
                📂 ${faq.model}
              </a>
            </div>
          </div>
        </div>
      `;
      faqContainer.appendChild(item);

      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }
}

// 5. WIDGET: GLOSSARY SEARCH TABLE
function initGlossary() {
  const searchInput = document.getElementById('glossary-search-input');
  const tbody = document.getElementById('glossary-table-body');

  if (!tbody) return;

  renderGlossaryRows(HAMMER_DATA.glossary);

  if (searchInput) {
    searchInput.addEventListener('keyup', () => {
      const query = searchInput.value.toLowerCase().trim();
      const filtered = HAMMER_DATA.glossary.filter(item => {
        return item.en.toLowerCase().includes(query) ||
               item.vi.toLowerCase().includes(query) ||
               item.desc.toLowerCase().includes(query) ||
               item.model.toLowerCase().includes(query);
      });
      renderGlossaryRows(filtered);
    });
  }

  function renderGlossaryRows(data) {
    tbody.innerHTML = '';
    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 24px;">Không tìm thấy thuật ngữ phù hợp.</td></tr>`;
      return;
    }

    data.forEach(item => {
      const tr = document.createElement('tr');
      
      let modelLink = '—';
      if (item.url) {
        modelLink = `<a href="${item.url}" class="code-link">📂 ${item.model}</a>`;
      } else if (item.model) {
        modelLink = `<span style="font-family: monospace; font-size: 12px; color: var(--text-muted);">${item.model}</span>`;
      }

      tr.innerHTML = `
        <td><span class="glossary-term-en">${item.en}</span></td>
        <td><span class="glossary-term-vi">${item.vi}</span></td>
        <td><span class="block-text">${item.desc}</span></td>
        <td>${modelLink}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// 6. GLOBAL SIDEBAR SEARCH
function initGlobalSearch() {
  const globalSearch = document.getElementById('global-search');
  if (!globalSearch) return;

  globalSearch.addEventListener('keyup', (e) => {
    const query = globalSearch.value.toLowerCase().trim();
    if (query === '') return;

    const glossarySearchInput = document.getElementById('glossary-search-input');

    if (glossarySearchInput) {
      glossarySearchInput.value = query;
      const event = new Event('keyup');
      glossarySearchInput.dispatchEvent(event);
    }

    if (e.key === 'Enter') {
      const navGlossary = document.querySelector('.nav-item[data-target="glossary"]');
      if (navGlossary) {
        navGlossary.click();
      }
    }
  });
}

// 7. WIDGET: AI ROADMAP DYNAMIC RENDERING
function initAiRoadmap() {
  const gapContainer = document.getElementById('ai-gap-details-container');
  const escrowContainer = document.getElementById('escrow-rules-container');
  const securityContainer = document.getElementById('ai-security-container');
  
  if (gapContainer) {
    gapContainer.innerHTML = `
      <h4 style="font-family: var(--font-title); font-size: 15px; margin-bottom: 16px; color: #fff;">📊 Phân bổ chi tiết tài nguyên (Resource Allocation Details)</h4>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${HAMMER_DATA.ai_agent_details.allocation.map(item => `
          <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-color); border-radius: 8px; padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: #fff; font-size: 14px;">${item.title}</strong>
              <span class="badge ${item.status === 'reuse' ? 'success' : (item.status === 'extend' ? 'tech' : 'danger')}" style="margin-bottom: 0;">
                ${item.statusText}
              </span>
            </div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">${item.desc}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  if (escrowContainer) {
    escrowContainer.innerHTML = `
      <div class="glass-card" style="margin: 0; background: rgba(0,0,0,0.15); border: 1px solid var(--border-color);">
        <h4 style="font-family: var(--font-title); font-size: 15px; margin-bottom: 12px; color: #fff;">📜 Quy tắc Ví bảo chứng (Escrow Rules)</h4>
        <ul style="font-size: 13px; color: var(--text-secondary); padding-left: 18px; line-height: 1.8;">
          ${HAMMER_DATA.ai_agent_details.escrow_rules.map(rule => `<li style="margin-bottom: 8px;">${rule}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  if (securityContainer) {
    const sec = HAMMER_DATA.ai_agent_details.security;
    securityContainer.innerHTML = `
      <h3 class="card-title" style="color: var(--accent-pink);">🔒 ${sec.title}</h3>
      <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
        ${sec.desc}
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 16px;">
        ${sec.points.map(pt => `
          <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 8px; padding: 16px;">
            <span style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; display: block;">${pt}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// 8. WIDGET: WHATSAPP SYNC CONTROLLER
function initWhatsAppSync() {
  const syncBtn = document.getElementById('sync-whatsapp-btn');
  const clearBtn = document.getElementById('clear-whatsapp-btn');
  const chatBox = document.getElementById('whatsapp-chat-box');

  if (!syncBtn || !clearBtn || !chatBox) return;

  syncBtn.addEventListener('click', loadChatLogs);

  clearBtn.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn xóa sạch lịch sử trò chuyện WhatsApp đã đồng bộ cục bộ?')) {
      fetch('http://localhost:8080/chat', { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          chatBox.innerHTML = 'Lịch sử trò chuyện đã được xóa sạch.';
          alert('Đã xóa lịch sử trò chuyện WhatsApp cục bộ.');
        })
        .catch(err => {
          console.error(err);
          alert('Không thể kết nối tới server nhận tin local.');
        });
    }
  });

  // Auto-load on activation of WhatsApp tab
  const whatsappNavTab = document.querySelector('.nav-item[data-target="whatsapp"]');
  if (whatsappNavTab) {
    whatsappNavTab.addEventListener('click', loadChatLogs);
  }

  function loadChatLogs() {
    chatBox.innerHTML = 'Đang đồng bộ tin nhắn từ server local...';
    fetch('http://localhost:8080/chat')
      .then(res => res.text())
      .then(text => {
        if (text.trim() === '' || text.startsWith('Chưa có dữ liệu')) {
          chatBox.innerHTML = 'Chưa có dữ liệu trò chuyện WhatsApp được đồng bộ. Hãy paste code observer vào tab Console của WhatsApp Web.';
          return;
        }
        // Format lines nicely
        const lines = text.split('\n');
        const formattedLines = lines.map(line => {
          if (line.trim() === '') return '';
          // format: "[timestamp] [sender]: message" or "[timestamp] [[chatName] Development Team — sender]: message"
          const match = line.match(/^\[([^\]]+)\]\s+\[(.*)\]:\s*(.*)$/);
          if (match) {
            const time = match[1];
            let sender = match[2];
            const msg = match[3];
            
            let chatPrefix = '';
            // If sender contains a " — " separator (e.g., "[Hammer] Development Team — Michelle Ang")
            if (sender.includes(' — ')) {
              const parts = sender.split(' — ');
              chatPrefix = `<span style="color: var(--text-muted); font-size: 11px; font-weight: normal;">${escapeHtml(parts[0])} | </span>`;
              sender = parts[1];
            }
            
            const isMe = sender === 'Tôi' || sender === 'Me' || sender === 'Song Quyen';
            const senderColor = isMe ? '#A855F7' : '#06B6D4';
            return `<div style="margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.02); padding-bottom: 6px;">
              <span style="color: var(--text-muted); font-size: 11px;">[${time}]</span> 
              ${chatPrefix}
              <strong style="color: ${senderColor}; font-family: var(--font-title); font-size: 13px; margin-left: 4px; margin-right: 8px;">${sender}:</strong> 
              <span style="color: #f3f4f6;">${escapeHtml(msg)}</span>
            </div>`;
          }
          return `<div>${escapeHtml(line)}</div>`;
        }).join('');
        
        chatBox.innerHTML = formattedLines;
        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
      })
      .catch(err => {
        chatBox.innerHTML = `<span style="color: var(--color-danger);">❌ Không thể kết nối tới server nhận tin local (http://localhost:8080). Hãy chắc chắn rằng bạn đang chạy Terminal dự án trong VS Code.</span>`;
      });
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// 9. WIDGET: DATABASE ERD RENDERER
function initDatabaseErd() {
  const container = document.getElementById('database-erd-container');
  if (!container) return;

  // Render sub-tabs structure
  container.innerHTML = `
    <div class="ddd-flow-tabs" style="margin-bottom: 24px;">
      <button id="db-tab-ba" class="flow-tab active">📋 Góc nhìn Nghiệp vụ BA</button>
      <button id="db-tab-tech" class="flow-tab">🛠️ Đặc tả Kỹ thuật (Tables)</button>
    </div>
    
    <div id="db-content-ba" class="db-section-content active-content">
      <!-- RENDER BA CONTENT -->
    </div>
    
    <div id="db-content-tech" class="db-section-content" style="display: none;">
      <!-- RENDER TECHNICAL TABLES -->
    </div>
  `;

  const baContainer = document.getElementById('db-content-ba');
  const techContainer = document.getElementById('db-content-tech');
  const tabBaBtn = document.getElementById('db-tab-ba');
  const tabTechBtn = document.getElementById('db-tab-tech');

  // 1. RENDER BA CONTENT
  baContainer.innerHTML = `
    <div class="glass-card" style="border-left: 4px solid var(--accent-purple); margin-bottom: 24px;">
      <h3 class="card-title" style="color: var(--accent-purple);">💡 Mô hình hóa CSDL dưới góc nhìn BA</h3>
      <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
        Hệ thống dữ liệu của AI Agent được thiết kế để chuẩn hóa toàn bộ phễu thu thập tin và tự động so khớp việc làm với hồ sơ vũ công. Dưới đây là cách dòng thông tin vận hành và tương tác giữa các bảng thực tế.
      </p>
    </div>

    <!-- Entity Grid -->
    <h3 style="font-family: var(--font-title); font-size: 16px; margin-bottom: 16px; color: var(--text-primary);">1. Ý nghĩa Nghiệp vụ các Bảng</h3>
    <div class="home-grid" style="margin-top: 0; margin-bottom: 32px; grid-template-columns: repeat(2, 1fr);">
      <div class="glass-card" style="margin: 0; padding: 20px;">
        <strong style="color: var(--accent-cyan); display: flex; align-items: center; gap: 8px; font-size: 15px;">🌐 SourceLink (Nguồn cào)</strong>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-top: 8px;">
          Danh sách tài khoản mạng xã hội (Instagram, FB) hoặc website studio tuyển dụng. Đây là "đầu vào" được Admin cấu hình cào quét tự động.
        </p>
      </div>
      <div class="glass-card" style="margin: 0; padding: 20px;">
        <strong style="color: var(--accent-cyan); display: flex; align-items: center; gap: 8px; font-size: 15px;">📄 RawPage (Trang thô)</strong>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-top: 8px;">
          Lịch sử lưu trữ toàn bộ văn bản và mã HTML thô được tải về. Giúp đối chiếu dữ liệu gốc và tránh cào quét trùng bài viết cũ nhờ <code>contentHash</code>.
        </p>
      </div>
      <div class="glass-card" style="margin: 0; padding: 20px;">
        <strong style="color: var(--accent-pink); display: flex; align-items: center; gap: 8px; font-size: 15px;">💼 Opportunity (Tin tuyển dụng)</strong>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-top: 8px;">
          Tin tuyển dụng sạch đã được AI bóc tách thông tin chuẩn hóa: Tên job, thù lao, thể loại nhảy, địa điểm ứng tuyển và độ tin cậy trích xuất.
        </p>
      </div>
      <div class="glass-card" style="margin: 0; padding: 20px;">
        <strong style="color: var(--accent-pink); display: flex; align-items: center; gap: 8px; font-size: 15px;">💃 Dancer (Hồ sơ Vũ công)</strong>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-top: 8px;">
          Hồ sơ năng lực của vũ công trên app: Chuyên môn nhảy, mức thù lao mong muốn, lịch rảnh, bán kính di chuyển và video reels portfolio.
        </p>
      </div>
      <div class="glass-card" style="margin: 0; grid-column: span 2; border: 1px solid rgba(109, 40, 217, 0.3); background: rgba(109, 40, 217, 0.03); padding: 20px;">
        <strong style="color: var(--accent-purple); display: flex; align-items: center; gap: 8px; font-size: 16px;">🤖 Recommendation (Bộ não so khớp AI)</strong>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-top: 8px;">
          <strong>Bảng trung gian cốt lõi:</strong> Nơi AI ghép cặp Dancer với Job. Lưu trữ Match %, điểm số thành phần (lương, vị trí, lịch rảnh), cảnh báo rủi ro (risks), thư ứng tuyển soạn nháp (AI Draft), và trạng thái Dancer phản hồi (Đồng ý/Từ chối).
        </p>
      </div>
    </div>

    <!-- Relationships description -->
    <h3 style="font-family: var(--font-title); font-size: 16px; margin-bottom: 16px; color: var(--text-primary);">2. Liên kết các bảng & Tỷ lệ quan hệ (Data Mapping)</h3>
    <div class="glass-card" style="margin-bottom: 32px; padding: 24px;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <strong style="color: var(--text-primary); font-size: 14px; display: block; margin-bottom: 4px;">🔗 SourceLink ➔ RawPage (Quan hệ 1 - Nhiều)</strong>
          <span style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; display: block;">
            Một nguồn cào (ví dụ: 1 kênh Instagram) có thể thu hoạch về hàng trăm bài đăng thô theo thời gian.
          </span>
        </div>
        <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <strong style="color: var(--text-primary); font-size: 14px; display: block; margin-bottom: 4px;">🔗 RawPage ➔ Opportunity (Quan hệ 1 - Nhiều)</strong>
          <span style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; display: block;">
            Một bài viết thô sau khi được AI phân tích có thể tách ra một hoặc nhiều job cụ thể (Ví dụ: Một bài viết tuyển cùng lúc 1 giáo viên Jazz và 1 giáo viên Ballet ➔ tạo ra 2 cơ hội tuyển dụng).
          </span>
        </div>
        <div>
          <strong style="color: var(--text-primary); font-size: 14px; display: block; margin-bottom: 4px;">🔗 Opportunity & Dancer ➔ Recommendation (Quan hệ Nhiều - Nhiều)</strong>
          <span style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; display: block;">
            Đây là liên kết nghiệp vụ phức tạp nhất. Một cơ hội tuyển dụng có thể được gợi ý tới nhiều vũ công phù hợp. Ngược lại, một vũ công có thể nhận được nhiều gợi ý công việc khác nhau trong luồng. Bảng <code>Recommendation</code> đứng ở giữa làm cầu nối lưu trữ vết ghép đôi.
          </span>
        </div>
      </div>
    </div>

    <!-- Operational Scenario -->
    <h3 style="font-family: var(--font-title); font-size: 16px; margin-bottom: 16px; color: var(--text-primary);">3. Kịch bản Vận hành nghiệp vụ thực tế</h3>
    <div class="glass-card" style="border-left: 4px solid var(--color-success); padding: 24px;">
      <ol style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 14px; line-height: 1.6;">
        <li>
          <strong style="color: var(--text-primary);">Bước 1: Admin cấu hình nguồn cào</strong><br/>
          Tạo bản ghi mới trong <code style="color: var(--accent-cyan); font-family: monospace;">SourceLink</code> chứa URL Instagram tuyển dụng của Studio X.
        </li>
        <li>
          <strong style="color: var(--text-primary);">Bước 2: Crawler cào dữ liệu thô</strong><br/>
          Quét bài đăng của Studio X, tải văn bản thô về lưu thành <code style="color: var(--accent-cyan); font-family: monospace;">RawPage</code> kèm mã hash kiểm tra trùng.
        </li>
        <li>
          <strong style="color: var(--text-primary);">Bước 3: AI Parser chuẩn hóa tin</strong><br/>
          AI đọc văn bản thô, trích xuất thành <code style="color: var(--accent-pink); font-family: monospace;">Opportunity</code> mới: <em>"Tuyển GV Hip-Hop tại Q3, Lương 600k/giờ"</em>.
        </li>
        <li>
          <strong style="color: var(--text-primary);">Bước 4: Khớp nối vũ công phù hợp</strong><br/>
          Hệ thống quét bảng <code style="color: var(--accent-pink); font-family: monospace;">Dancer</code>, thấy Dancer <em>Khánh</em> chuyên Hip-hop, sinh sống ở Q3 và mong muốn thù lao 500k/giờ.
        </li>
        <li>
          <strong style="color: var(--text-primary);">Bước 5: Tạo gợi ý và thư xin việc soạn sẵn</strong><br/>
          Hệ thống tạo bản ghi <code style="color: var(--accent-purple); font-family: monospace;">Recommendation</code> liên kết Dancer <em>Khánh</em> với job trên, tính điểm Match = 98%, tự viết thư xin việc nháp và cảnh báo nếu có rủi ro (lệch lịch rảnh).
        </li>
        <li>
          <strong style="color: var(--text-primary);">Bước 6: Dancer duyệt và ứng tuyển</strong><br/>
          Dancer mở App thấy tin ứng tuyển được cá nhân hóa, bấm <strong>Đồng ý</strong> ➔ Trạng thái Recommendation cập nhật thành <code>accepted</code> và gửi AI Draft đi.
        </li>
      </ol>
    </div>
  `;

  // 2. RENDER TECHNICAL TABLES
  let tablesHtml = HAMMER_DATA.database_erd.tables.map(table => {
    let columnsHtml = table.columns.map(col => `
      <tr>
        <td style="font-family: monospace; font-weight: 600; color: var(--accent-purple);">${col.name}</td>
        <td style="font-family: monospace; color: var(--text-primary); font-size: 12px;">${col.type}</td>
        <td>${col.desc}</td>
      </tr>
    `).join('');

    return `
      <div class="glass-card">
        <h3 class="card-title" style="color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 12px;">
          🗄️ ${table.name}
        </h3>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px; font-style: italic;">
          ${table.desc}
        </p>
        <div class="glossary-table-wrapper">
          <table class="glossary-table">
            <thead>
              <tr>
                <th style="width: 25%;">Trường (Column)</th>
                <th style="width: 25%;">Kiểu (Type)</th>
                <th style="width: 50%;">Mô tả (Description)</th>
              </tr>
            </thead>
            <tbody>
              ${columnsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }).join('');

  techContainer.innerHTML = `
    <div class="glass-card" style="border-left: 4px solid var(--accent-purple); margin-bottom: 24px;">
      <h3 class="card-title" style="color: var(--accent-purple);">📊 Trích xuất CSDL thực tế từ schema.prisma</h3>
      <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
        Toàn bộ cấu trúc bảng bên dưới được lấy chính xác từ file cấu hình Prisma ORM của AI Agent kết nối với Supabase Postgres:
      </p>
      <a href="file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-agent/prisma/schema.prisma" class="code-link">
        📂 schema.prisma
      </a>
    </div>
    
    ${tablesHtml}
  `;

  // 3. TAB TOGGLING LISTENERS
  tabBaBtn.addEventListener('click', () => {
    tabTechBtn.classList.remove('active');
    tabBaBtn.classList.add('active');
    techContainer.style.display = 'none';
    baContainer.style.display = 'block';
  });

  tabTechBtn.addEventListener('click', () => {
    tabBaBtn.classList.remove('active');
    tabTechBtn.classList.add('active');
    baContainer.style.display = 'none';
    techContainer.style.display = 'block';
  });
}
