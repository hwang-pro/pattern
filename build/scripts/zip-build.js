import { createWriteStream } from 'fs'
import { readdir, stat } from 'fs/promises'
import { join, relative } from 'path'
import archiver from 'archiver'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const outputPath = join(rootDir, 'build.zip')

async function zipDirectory(sourceDir, outputPath) {
  return new Promise(async (resolve, reject) => {
    const output = createWriteStream(outputPath)
    const archive = archiver('zip', {
      zlib: { level: 9 }
    })

    output.on('close', () => {
      console.log(`✅ 빌드 파일이 ${archive.pointer()} bytes로 압축되었습니다.`)
      console.log(`📦 파일 위치: ${outputPath}`)
      resolve()
    })

    archive.on('error', (err) => {
      reject(err)
    })

    archive.pipe(output)

    // dist 디렉토리의 모든 파일을 압축
    async function addDirectory(dir, basePath = '') {
      const files = await readdir(dir)
      
      for (const file of files) {
        const filePath = join(dir, file)
        const statInfo = await stat(filePath)
        
        if (statInfo.isDirectory()) {
          await addDirectory(filePath, join(basePath, file))
        } else {
          const relativePath = join(basePath, file)
          archive.file(filePath, { name: relativePath })
        }
      }
    }

    try {
      await addDirectory(sourceDir)
      await archive.finalize()
    } catch (error) {
      reject(error)
    }
  })
}

async function main() {
  try {
    console.log('📦 빌드 파일을 압축하는 중...')
    await zipDirectory(distDir, outputPath)
  } catch (error) {
    console.error('❌ 압축 중 오류 발생:', error)
    process.exit(1)
  }
}

main()

