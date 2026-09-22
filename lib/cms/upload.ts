import path from 'path'
import fs from 'fs/promises'

const DATA_DIR = path.join(process.cwd(), 'data')
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
}

export async function saveUploadedFile(file: File): Promise<string> {
  await ensureUploadDir()

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Sanitize filename
  const ext = path.extname(file.name).toLowerCase()
  const base = path.basename(file.name, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase()
  const timestamp = Date.now()
  const filename = `${base}-${timestamp}${ext}`
  const filepath = path.join(UPLOAD_DIR, filename)

  await fs.writeFile(filepath, buffer)
  return `/uploads/${filename}`
}

export async function deleteUploadedFile(publicPath: string): Promise<void> {
  if (!publicPath || !publicPath.startsWith('/uploads/')) return
  const filename = path.basename(publicPath)
  const filepath = path.join(UPLOAD_DIR, filename)
  try {
    await fs.unlink(filepath)
  } catch {
    // File may not exist, ignore
  }
}

export { DATA_DIR }
