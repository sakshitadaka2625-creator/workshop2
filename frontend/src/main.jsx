import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'https://workshop2-1-cq2t.onrender.com').replace(/\/$/, '');
const coverImages = [
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85'
];
const categories = ['All events', 'Technology', 'Arts & culture', 'Community', 'Career'];
const get = (obj, keys, fallback = '') => keys.map(k => obj?.[k]).find(v => v !== undefined && v !== null && v !== '') ?? fallback;
const dateValue = event => get(event, ['starts_at', 'start_time', 'date', 'event_date', 'startsAt']);
const eventTitle = event => get(event, ['title', 'name', 'event_name'], 'Campus event');
const eventImage = (event, i) => get(event, ['image_url', 'image', 'cover_image', 'banner_url'], coverImages[i % coverImages.length]);
const eventCategory = event => get(event, ['category', 'type', 'tag'], 'Campus life');
const asDate = value => { const d = value ? new Date(value) : null; return d && !Number.isNaN(d.valueOf()) ? d : null; };
const formattedDate = value => { const d = asDate(value); return d ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(d) : 'Date to be announced'; };
const formattedTime = value => { const d = asDate(value); return d ? new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(d) : ''; };
function uuid() { return crypto.randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }); }
function anonymousId() { let id = localStorage.getItem('campuspulse_guest_id'); if (!id) { id = uuid(); localStorage.setItem('campuspulse_guest_id', id); } return id; }

function App() {
  const [events, setEvents] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const [selected, setSelected] = useState(null); const [query, setQuery] = useState(''); const [category, setCategory] = useState('All events'); const [notice, setNotice] = useState(''); const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(() => JSON.parse(localStorage.getItem('campuspulse_registered') || '[]'));
  const loadEvents = async () => {
    setLoading(true); setError('');
    try { const response = await fetch(`${API_URL}/api/events`); if (!response.ok) throw new Error(`Events API returned ${response.status}`); const data = await response.json(); if (!Array.isArray(data)) throw new Error('Events API returned an unexpected response'); setEvents(data); }
    catch (e) { setError(e.message || 'Could not reach the events service.'); setEvents([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadEvents(); }, []);
  const visible = useMemo(() => events.filter(e => {
    const text = `${eventTitle(e)} ${get(e,['description','details'])} ${eventCategory(e)} ${get(e,['location','venue'])}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase()); const matchesCategory = category === 'All events' || eventCategory(e).toLowerCase().includes(category.split(' ')[0].toLowerCase());
    return matchesQuery && matchesCategory;
  }), [events, query, category]);
  const register = async event => {
    setRegistering(true); setNotice('');
    try {
      const response = await fetch(`${API_URL}/api/registrations`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ user_id: anonymousId(), event_id: event.id }) });
      const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.error || `Registration failed (${response.status})`);
      const next = [...new Set([...registered, event.id])]; setRegistered(next); localStorage.setItem('campuspulse_registered', JSON.stringify(next)); setNotice('You’re on the list! Your spot is saved.');
    } catch (e) { setNotice(e.message || 'Could not complete registration.'); }
    finally { setRegistering(false); }
  };
  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">✳</span><span>campus<span>pulse</span></span></a><nav><a className="nav-active" href="#events">Discover</a><a href="#events">Events</a><a href="#about">About</a></nav><a className="header-cta" href="#events">Explore events <span>↗</span></a><button className="mobile-menu" aria-label="Open menu">☰</button></header>
    <main id="top"><section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="pulse-dot"/> YOUR CAMPUS, IN MOTION</div><h1>Make room for<br/><em>something good.</em></h1><p>Find your people, try something new, and make the most of what’s happening around campus.</p><a href="#events" className="primary-btn">Find your next thing <span>↓</span></a><div className="hero-footnote"><span className="avatar-stack"><i>J</i><i>M</i><i>A</i></span><span>Good things happen when we show up.</span></div></div><div className="hero-art"><img src={coverImages[0]} alt="Students enjoying a campus gathering"/><div className="art-shade"/><div className="hero-note"><span className="note-icon">✦</span><div><b>Find your people</b><small>Make a memory this week</small></div></div><div className="floating-stamp">CAMPUS<br/>LIFE <span>✳</span></div></div><div className="hero-orb"/></section>
    <section className="event-section" id="events"><div className="section-head"><div><div className="eyebrow muted">THE GOOD STUFF</div><h2>Find your <em>next thing.</em></h2><p>Little moments, big ideas, and everything in between.</p></div><div className="event-count"><strong>{events.length.toString().padStart(2,'0')}</strong><span>events<br/>to explore</span></div></div>
      <div className="filters"><div className="searchbox"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search events, places, ideas..." aria-label="Search events"/><kbd>⌘ K</kbd></div><div className="category-list">{categories.map(c=><button key={c} className={category===c?'category selected':'category'} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
      {error && <div className="api-alert"><span>!</span><div><b>Events are taking a breather.</b><p>{error}. The frontend is connected to <code>{API_URL}</code>; the service is currently not returning event data.</p></div><button onClick={loadEvents}>Try again</button></div>}
      {loading ? <div className="loading-grid">{[1,2,3].map(n=><div className="skeleton" key={n}/>)}</div> : !error && visible.length===0 ? <div className="empty-state"><span>✳</span><h3>{events.length ? 'Nothing matches just yet.' : 'A little quiet around here.'}</h3><p>{events.length ? 'Try another search or category.' : 'Check back soon for new things to do.'}</p><button className="text-btn" onClick={loadEvents}>Refresh events ↻</button></div> : <div className="event-grid">{visible.map((event,index)=><article className="event-card" key={event.id || index} onClick={()=>setSelected(event)}><div className="card-image"><img src={eventImage(event,index)} alt=""/><span className="image-tag">{eventCategory(event)}</span><button className="save-btn" aria-label="Open event" onClick={e=>{e.stopPropagation();setSelected(event)}}>↗</button></div><div className="card-content"><div className="card-date"><span className="date-marker">✳</span>{formattedDate(dateValue(event))}{formattedTime(dateValue(event)) && <span> · {formattedTime(dateValue(event))}</span>}</div><h3>{eventTitle(event)}</h3><p>{get(event,['description','details'], 'A chance to connect, explore, and make something memorable.')}</p><div className="card-bottom"><span>⌖ &nbsp;{get(event,['location','venue'], 'Campus location')}</span><button onClick={e=>{e.stopPropagation();setSelected(event)}}>Details <span>↗</span></button></div></div></article>)}</div>}
      {!loading && !error && events.length>0 && <div className="section-end"><span/>You’re all caught up<span/></div>}
    </section><section className="closing" id="about"><div className="closing-star">✳</div><div><div className="eyebrow">THERE’S A PLACE FOR YOU</div><h2>Your campus story<br/>starts <em>here.</em></h2></div><a href="#events" className="round-arrow">↗</a><span className="closing-scribble">see you<br/>out there!</span></section></main>
    <footer><a className="brand" href="#top"><span className="brand-mark">✳</span><span>campus<span>pulse</span></span></a><p>Made for the moments between classes.</p><span>© 2026 CampusPulse</span></footer>
    {selected && <div className="modal-backdrop" onClick={()=>{setSelected(null);setNotice('')}}><section className="event-modal" role="dialog" aria-modal="true" aria-label="Event details" onClick={e=>e.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={()=>{setSelected(null);setNotice('')}}>×</button><img className="modal-image" src={eventImage(selected,0)} alt=""/><div className="modal-body"><span className="image-tag static-tag">{eventCategory(selected)}</span><h2>{eventTitle(selected)}</h2><p className="modal-date">✳ &nbsp;{formattedDate(dateValue(selected))}{formattedTime(dateValue(selected)) && ` · ${formattedTime(dateValue(selected))}`}</p><p>⌖ &nbsp;{get(selected,['location','venue'], 'Campus location')}</p><p className="modal-description">{get(selected,['description','details'], 'Join us for a memorable campus event. Connect with your community and discover something new.')}</p>{notice && <div className={notice.includes('saved')?'success-note':'error-note'}>{notice}</div>}<button className="primary-btn full-btn" disabled={registering || registered.includes(selected.id)} onClick={()=>register(selected)}>{registered.includes(selected.id)?'You’re registered ✓':registering?'Saving your spot…':'Count me in ↗'}</button><small className="guest-note">No account needed. Your spot is saved as a guest.</small></div></section></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
