SystemJS.config({
    baseURL: 'https://unpkg.com/',
    defaultExtension: true,
    packages: {
        ".": {
            main: './app.js',
            defaultExtension: 'js'
        }
    },
    meta: {
        '*.js': {
            'babelOptions': {
                react: true
            }
        }
    },
    map: {
        'plugin-babel': 'systemjs-plugin-babel@latest/plugin-babel.js',
        'systemjs-babel-build': 'systemjs-plugin-babel@latest/systemjs-babel-browser.js',
        'react': 'react@17.0.1/umd/react.development.js',
        'react-dom': 'react-dom@17.0.1/umd/react-dom.development.js',
    },
    transpiler: 'plugin-babel'
});

SystemJS.import('./app').catch(console.error.bind(console));

window.onload = () => {
    changeWatcher(
        'http://localhost:7700/',
        [
            // 'index.html',
            // 'utils.js'
            'config.js',
            'app.js',
            'app.css',
            'components.js',
            'components.css',
        ],
        1000
    )
}

function changeWatcher(host, files, delay) {
    const last = [];
    var promise = Promise.resolve(); // Inicializando a Promise com resolução imediata

    for (const f in files) {
        promise = promise.then(async () => {
            const data = await fetch(host + files[f]).then(res => res.text());
            last.push(data);
        });
    }

    promise.catch((err) => {
        console.log(err)
        console.log('Retring to start change watcher')
        setTimeout(() => changeWatcher(host, files, delay), 180)
    })

    const detectChanges = () => {
        console.log('Detecting...')
        const newer = [];
        var promise = Promise.resolve(); // Inicializando a Promise com resolução imediata

        for (const f in files) {
            promise = promise.then(async () => {
                const data = await fetch(host + files[f]).then(res => res.text());
                newer.push(data);
            });
        }

        promise.then(() => {
            for (let i = 0; i < last.length; i++) {
                if (last[i] !== newer[i]) {
                    console.log('Update!')
                    document.body.innerHTML = '<div style="width: 100vw; height: 100vh; background: #111; color: #0f8; display: flex; justify-content: center; align-items: center; font-family: Ariall Helvetica Sans-Serif monospace; font-size: 2rem;">RELOADING...</div>'
                    window.location.replace(window.location.href);
                    break;
                }
            }
        });

        promise.catch((err) => {
            console.log(err)
            console.log('Retring to start change watcher')
            setTimeout(() => changeWatcher(host, files, delay), 180)
        })
    }

    promise.then(() => {
        setInterval(detectChanges, delay);
    });
}