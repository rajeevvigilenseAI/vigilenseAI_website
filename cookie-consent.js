(function () {
    'use strict';

    var STORAGE_KEY = 'vigilense_cookie_consent';
    var LEADSOURCING_TID = 'K1WqUfBv0O6DTWEW1NEg';

    function getGtmContainerId() {
        if (typeof window.VIGILENSE_GTM_ID === 'string' && window.VIGILENSE_GTM_ID) {
            return window.VIGILENSE_GTM_ID;
        }
        return '';
    }

    function getConsent() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setConsent(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            /* ignore private browsing */
        }
    }

    function loadLeadsourcing() {
        if (window.__vigilenseLeadsourcingLoaded) {
            return;
        }
        window.__vigilenseLeadsourcingLoaded = true;
        !function (e, t, n, r) {
            (n = e.createElement('script')).async = true;
            n.src = 'https://visitor.leadsourcing.co/n?tid=' + t;
            (r = e.getElementsByTagName('script')[0]).parentNode.insertBefore(n, r);
        }(document, LEADSOURCING_TID);
    }

    function loadGoogleTagManager(containerId) {
        if (!containerId || window.__vigilenseGtmLoaded) {
            return;
        }
        window.__vigilenseGtmLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(containerId);
        document.head.appendChild(script);

        if (!document.getElementById('vigilense-gtm-noscript')) {
            var noscript = document.createElement('noscript');
            noscript.id = 'vigilense-gtm-noscript';
            noscript.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=' +
                encodeURIComponent(containerId) +
                '" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
            document.body.insertBefore(noscript, document.body.firstChild);
        }
    }

    function loadMarketingTags() {
        var gtmId = getGtmContainerId();
        if (gtmId) {
            loadGoogleTagManager(gtmId);
            return;
        }
        loadLeadsourcing();
    }

    function injectStyles() {
        if (document.getElementById('vigilense-consent-styles')) {
            return;
        }
        var style = document.createElement('style');
        style.id = 'vigilense-consent-styles';
        style.textContent = [
            '.vigilense-consent{position:fixed;left:0;right:0;bottom:0;z-index:10000;',
            'padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));',
            'background:rgba(10,22,40,.94);backdrop-filter:blur(8px);',
            'border-top:1px solid rgba(255,255,255,.08);',
            'transform:translateY(0);opacity:1;transition:transform .28s ease,opacity .28s ease}',
            '.vigilense-consent--hide{transform:translateY(100%);opacity:0;pointer-events:none}',
            '.vigilense-consent__inner{max-width:1120px;margin:0 auto;display:flex;',
            'align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}',
            '.vigilense-consent__text{margin:0;font:400 13px/1.45 "Outfit",system-ui,sans-serif;color:rgba(255,255,255,.82)}',
            '.vigilense-consent__text a{color:#00D4AA;text-decoration:underline;text-underline-offset:2px}',
            '.vigilense-consent__text a:hover{color:#33E0BB}',
            '.vigilense-consent__actions{display:flex;align-items:center;gap:8px;flex-shrink:0}',
            '.vigilense-consent__btn{border:0;border-radius:6px;padding:7px 14px;',
            'font:500 12px/1 "Outfit",system-ui,sans-serif;cursor:pointer;transition:background .15s ease,color .15s ease}',
            '.vigilense-consent__btn--accept{background:#00D4AA;color:#0A1628}',
            '.vigilense-consent__btn--accept:hover{background:#33E0BB}',
            '.vigilense-consent__btn--decline{background:transparent;color:rgba(255,255,255,.65)}',
            '.vigilense-consent__btn--decline:hover{color:#fff}',
            '@media(max-width:640px){.vigilense-consent__inner{align-items:flex-start}',
            '.vigilense-consent__actions{width:100%;justify-content:flex-end}}'
        ].join('');
        document.head.appendChild(style);
    }

    function hideBanner(bar) {
        if (!bar) {
            return;
        }
        bar.classList.add('vigilense-consent--hide');
        window.setTimeout(function () {
            bar.remove();
        }, 320);
    }

    function showBanner() {
        if (document.getElementById('vigilense-cookie-consent')) {
            return;
        }

        injectStyles();

        var bar = document.createElement('div');
        bar.id = 'vigilense-cookie-consent';
        bar.className = 'vigilense-consent';
        bar.setAttribute('role', 'dialog');
        bar.setAttribute('aria-live', 'polite');
        bar.setAttribute('aria-label', 'Cookie preferences');
        bar.innerHTML = [
            '<div class="vigilense-consent__inner">',
            '<p class="vigilense-consent__text">',
            'We use cookies and similar tools to understand site usage and attribute demo requests. ',
            '<a href="/privacy/">Privacy Policy</a>.',
            '</p>',
            '<div class="vigilense-consent__actions">',
            '<button type="button" class="vigilense-consent__btn vigilense-consent__btn--decline" data-consent="declined">Decline</button>',
            '<button type="button" class="vigilense-consent__btn vigilense-consent__btn--accept" data-consent="accepted">Accept</button>',
            '</div>',
            '</div>'
        ].join('');

        bar.addEventListener('click', function (event) {
            var button = event.target.closest('[data-consent]');
            if (!button) {
                return;
            }
            setConsent(button.getAttribute('data-consent'));
            hideBanner(bar);
        });

        document.body.appendChild(bar);
    }

    function init() {
        loadMarketingTags();

        var consent = getConsent();
        if (consent === 'accepted' || consent === 'declined') {
            return;
        }
        showBanner();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
