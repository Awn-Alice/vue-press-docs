# 文件上传

**常见文件的头文件信息：**

	gif图片： 47 49 46 38 39/37 61 3C
	
	jpg图片：FF D8   ….   FF D9

	png图片： 89 50 4E 47 0D 0A 1A

**大文件上传，生成文件切片：**
```javascript
createFileChunk(file, size=SIZE) {
    // 生成文件块
    const chunks = [];
    let cur = 0;
    while(cur < file.size) {
        chunks.push({ file: file.slice(cur, cur + size) });
        cur += size
    }
    return chunks;
}
```
**上传chunks**
```javascript
async uploadChunks(uploadedList = []) {
    const list = this.chumks
    .filter(chunk => uploadedList.indexOf(chunk.hash) == -1)
    .map(({ chunk, hash, index }, i) => {
        const form = new FormData()
        form.append('chunk', chunk)
        form.append('hash', hash)
        form.append('filename', this.container.file.name)
        form.append('fileHash', this.container.hash)
        return { form, index, status: Status.wait }
    })
    .map(({ form, index }) => {
        return request({
            url: '/upload',
            data: from,
            onProgress: this.createProgresshandler(this.chunks[index]),
            requestList: this.requestList
        })
    })
    await Promist.all(list)
}
```
**web-worker 方式计算文件hash值,大文件计算hash也是挺慢的，用web-worker方式计算，不影响主线程的执行**
```javascript
async calculateHash(chunks) {
    return new Promist( resolve => {
        this.container.worker = new Worker('/hash.js')
        this.container.worker.postMessage({ chunks })
        // 监听web-worker的通知
        this.container.worker.onmessage = e => {
            const { progress, hash } = e.data;
            this.hashProgress = Number(progress.toFixed(2))
            if(hash) resolve(hash)
        }
    })
}

// 下面是 hash.js 的代码
// hash.js

self.importScripts('spark-md5.min.js)

self.onmessage = e => {
    // 这里利用了闭包的原理，每次计算一个 chunk 的hash就通知一下主线程
    const { chunks } = e.data;
    const spark = new self.SparkMD5.ArrayBuffer()

    let progress = 0, count = 0;
    
    const loadNext = index => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(chunks[index].file)
        reader.onload = e => {
            count++
            spark.append(e.target.result)
            if( count === chunks.length) {
                self.postMessage({
                    progress: 100,
                    hash: spark.end()
                })
            } else {
                // 每个 chunk 计算完，通知主线程
                progress += 100/chunks.length
                self.postmessage({ progress })
                // 调用自身
                loadNext(count)
            }
        }
    }

    // 启动
    loadNext(0)
}
```

