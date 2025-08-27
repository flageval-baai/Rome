const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../data");
const outputDir = path.join(__dirname, "../public/data");

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 获取所有数据库目录
const databases = fs
  .readdirSync(dataDir)
  .filter((item) => fs.statSync(path.join(dataDir, item)).isDirectory())
  .filter((dir) => dir !== ".git");

// 处理每个数据库
databases.forEach((dbName) => {
  const dbDir = path.join(dataDir, dbName);
  const outputDbDir = path.join(outputDir, dbName);

  // 创建数据库输出目录
  if (!fs.existsSync(outputDbDir)) {
    fs.mkdirSync(outputDbDir, { recursive: true });
  }

  // 处理数据文件
  const dataFile = path.join(dbDir, `${dbName}_data.jsonl`);
  if (fs.existsSync(dataFile)) {
    const data = fs
      .readFileSync(dataFile, "utf-8")
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line));
    fs.writeFileSync(
      path.join(outputDbDir, "data.json"),
      JSON.stringify(data, null, 2)
    );
  }

  // 处理知识库文件
  const kbFile = path.join(dbDir, `${dbName}_kb.jsonl`);
  if (fs.existsSync(kbFile)) {
    const knowledge = fs
      .readFileSync(kbFile, "utf-8")
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line));
    fs.writeFileSync(
      path.join(outputDbDir, "knowledge.json"),
      JSON.stringify(knowledge, null, 2)
    );
  }

  // 处理 schema 文件
  const schemaFile = path.join(dbDir, "public.dot");
  if (fs.existsSync(schemaFile)) {
    const schema = {
      dotContent: fs.readFileSync(schemaFile, "utf-8"),
    };
    fs.writeFileSync(
      path.join(outputDbDir, "schema.json"),
      JSON.stringify(schema, null, 2)
    );
  }
});
