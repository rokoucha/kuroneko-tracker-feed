import { h, renderSSR, VERSION } from 'nano-jsx'
import type { Env } from './types'

export const Help = ({ BASE_URL }: Env) => (
  <html lang="en">
    <head>
      <style>{`
        body {
          font-family: sans-serif;
        }

        div {
          margin-bottom: 1rem;
        }

        label {
          margin-right: 1rem;
        }

        input {
          margin-right: 1rem;
        }

        input:invalid {
          border: red solid 2px;
        }

        button {
          margin-right: 1rem;
        }
      `}</style>
      <script type="module">{`
        const number01Input = document.getElementById('number01')
        const typeSelect = document.getElementById('type')
        const urlInput = document.getElementById('url')
        const copyButton = document.getElementById('copy')
        const openButton = document.getElementById('open')
        
        function generateFeedUrl() {
          const url = new URL('${BASE_URL}')
        
          url.pathname = \`/feed/\${number01Input.value.replaceAll('-', '')}/\${typeSelect.value}\`
        
          urlInput.value = url.href
        }
        
        number01Input.addEventListener('input', generateFeedUrl)
        typeSelect.addEventListener('change', generateFeedUrl)
        
        copyButton.addEventListener('click', async () => {
          copyButton.disabled = true
        
          try {
            await navigator.clipboard.writeText(urlInput.value)
          } catch (e) {
            console.error(e)
            alert('クリップボードに書き込めません、手動でコピーしてください')
          }
        
          copyButton.disabled = false
        })

        openButton.addEventListener('click', () => {
          window.open(urlInput.value)
        })
      `}</script>
      <title>Kuroneko Tracker Feed</title>
    </head>
    <body>
      <h1>Kuroneko Tracker Feed</h1>
      <hr />
      <div>
        <p>
          ヤマト運輸の荷物お問い合わせシステムから追跡データを取得してフィードを生成します
        </p>
        <strong>
          このアプリケーションはヤマト運輸非公式です。このアプリケーションを利用して発生した問題や損害について一切責任を負いません。
        </strong>
      </div>
      <div>
        <div>
          <label for="number01">追跡番号</label>
          <input
            id="number01"
            type="tel"
            pattern="\d{3,4}-?\d{4}-?\d{4}"
            placeholder="0000-0000-0000 or 000000000000"
          />
        </div>
        <div>
          <label for="type">フィードの種類</label>
          <select name="type" id="type">
            <option value="atom">Atom</option>
            <option value="json">JSON</option>
          </select>
        </div>
        <div>
          <label for="url">フィードのアドレス</label>
          <input
            id="url"
            type="text"
            readonly
            placeholder={`${BASE_URL}/feed/000000000000/atom`}
            size={72}
          />
          <button id="copy">アドレスをコピー</button>
          <button id="open">開く</button>
        </div>
        <hr />
        <div>
          <p>
            <a href="https://github.com/rokoucha/kuroneko-tracker-feed">
              kuroneko-tracker-feed/{VERSION}
            </a>
            , Developed by <a href="https://github.com/rokoucha">Rokoucha</a>
          </p>
        </div>
      </div>
    </body>
  </html>
)

export const renderHelp = (env: Env) => renderSSR(<Help {...env} />)
