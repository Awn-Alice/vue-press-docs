# hooks 的使用

### 封装一个从 excel 或者 txt 文件中读取id的hooks，新建文件 useIO.ts

```typescript
import XLSX from 'xlsx'

interface Ret {
_readText: (file: File) => Promise<string>,
_readXLSX: (file: File) => Promise<string>

}

export default function useIO(): Ret {
/** 读取 txt 文件 */
const _readText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader()
            reader.readAsText(file, 'utf-8')
            reader.onload = () => {
                const ret = reader.result as string
                // const ids = ret.split('\n').join(',')
                resolve(ret)
            }
        } catch (error) {
            reject(error)
        }
    })
}
/** 读取 excle 文件 */
const _readXLSX = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onload = () => {
                const data = reader.result
                /* read workbook */
                /**
                    * wb 对象中有 SheetNames 数组 [‘sheet1', 'sheet2']，
                    */
                const wb = XLSX.read(data, { type: 'binary' })
                /* grab first sheet */
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]
                /**
                    * 转json，拿到的是数组
                    * ['第一列title', '第二列title']
                    * ['第一列title下的第一行的数据', '第二列title下的第一行']
                    * ['第一列title下的第二行的数据', '第二列title下的第二行']
                    */
                const jsonData = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 })

                const ids = jsonData.map(item => item[0]).join(',')
                resolve(ids)
            }
        } catch (error) {
            reject(error)
        }
    })
}
return { _readText, _readXLSX }
}
```
