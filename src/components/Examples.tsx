/**
 * 示例库组件 - 官方 Cheatsheet 场景
 * 遵循 SRP：单一示例管理职责
 */

interface Example {
  name: string
  description: string
  json: string
  category: 'basic' | 'array' | 'nested' | 'special'
}

const EXAMPLES: Example[] = [
  {
    name: '简单对象',
    description: '基础键值对',
    category: 'basic',
    json: JSON.stringify({ id: 1, name: 'Ada' }, null, 2),
  },
  {
    name: '嵌套对象',
    description: '包含嵌套结构',
    category: 'nested',
    json: JSON.stringify({ user: { id: 1, name: 'Ada' } }, null, 2),
  },
  {
    name: '原始数组（内联）',
    description: '简单值数组',
    category: 'array',
    json: JSON.stringify({ tags: ['foo', 'bar', 'baz'] }, null, 2),
  },
  {
    name: '同构对象数组（表格）',
    description: 'TOON 表格模式示例',
    category: 'array',
    json: JSON.stringify({
      items: [
        { id: 1, name: 'Widget', qty: 5, price: 9.99 },
        { id: 2, name: 'Gadget', qty: 3, price: 14.5 },
      ],
    }, null, 2),
  },
  {
    name: '混合/非同构数组（列表）',
    description: '不同类型或结构的数组',
    category: 'array',
    json: JSON.stringify({ items: [1, { a: 1 }, 'text'] }, null, 2),
  },
  {
    name: '数组的数组',
    description: '嵌套数组结构',
    category: 'nested',
    json: JSON.stringify({ pairs: [[1, 2], [3, 4]] }, null, 2),
  },
  {
    name: '根数组',
    description: '顶层即为数组',
    category: 'array',
    json: JSON.stringify(['x', 'y', 'z'], null, 2),
  },
  {
    name: '空容器',
    description: '空对象和空数组',
    category: 'special',
    json: JSON.stringify({ empty: {}, items: [] }, null, 2),
  },
  {
    name: '特殊引用',
    description: '包含逗号的字符串',
    category: 'special',
    json: JSON.stringify({ note: 'hello, world' }, null, 2),
  },
  {
    name: '布尔与字符串',
    description: '类型区分示例',
    category: 'special',
    json: JSON.stringify({ items: ['true', true, 'false', false] }, null, 2),
  },
  {
    name: 'Tab 分隔符示例',
    description: '使用制表符作为分隔符',
    category: 'array',
    json: JSON.stringify({
      products: [
        { id: 1, name: 'Widget', category: 'Tools', price: 9.99 },
        { id: 2, name: 'Gadget', category: 'Electronics', price: 14.5 },
        { id: 3, name: 'Doohickey', category: 'Tools', price: 7.25 },
      ],
    }, null, 2),
  },
  {
    name: '长度标记示例',
    description: '使用 # 前缀的长度标记',
    category: 'special',
    json: JSON.stringify({
      tags: ['reading', 'gaming', 'coding'],
      categories: ['tech', 'lifestyle', 'business'],
    }, null, 2),
  },
  {
    name: '深层嵌套结构',
    description: '多层嵌套的复杂对象',
    category: 'nested',
    json: JSON.stringify({
      company: {
        name: 'TechCorp',
        location: {
          city: 'Beijing',
          country: 'China',
        },
        employees: [
          { id: 1, name: 'Alice', role: 'Engineer' },
          { id: 2, name: 'Bob', role: 'Designer' },
        ],
      },
    }, null, 2),
  },
  {
    name: '带嵌套数组的列表',
    description: '列表中包含表格数组',
    category: 'nested',
    json: JSON.stringify({
      orders: [
        {
          orderId: 'ORD-001',
          items: [
            { sku: 'A1', qty: 2 },
            { sku: 'B2', qty: 1 },
          ],
          status: 'shipped',
        },
      ],
    }, null, 2),
  },
  {
    name: '数值与字符串混合',
    description: '包含不同数据类型',
    category: 'special',
    json: JSON.stringify({
      id: 123,
      name: 'Product',
      price: 99.99,
      inStock: true,
      tags: ['new', 'featured'],
      metadata: null,
    }, null, 2),
  },
  {
    name: '包含特殊字符',
    description: '需要引号转义的字符串',
    category: 'special',
    json: JSON.stringify({
      message: 'Hello, world!',
      path: 'C:\\Users\\Documents',
      quote: 'He said "hi"',
      multiline: 'line1\nline2',
    }, null, 2),
  },
  {
    name: '大型表格数据',
    description: '模拟真实数据场景',
    category: 'array',
    json: JSON.stringify({
      users: [
        { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin', active: true },
        { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user', active: true },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user', active: false },
        { id: 4, name: 'Diana', email: 'diana@example.com', role: 'moderator', active: true },
        { id: 5, name: 'Eve', email: 'eve@example.com', role: 'user', active: true },
      ],
    }, null, 2),
  },
]

interface ExamplesProps {
  onInsert: (json: string) => void
}

export function Examples({ onInsert }: ExamplesProps) {
  const categories = {
    basic: '基础',
    array: '数组',
    nested: '嵌套',
    special: '特殊',
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
        示例库
      </h3>
      
      <div className="space-y-4">
        {Object.entries(categories).map(([category, label]) => {
          const categoryExamples = EXAMPLES.filter(ex => ex.category === category)
          
          return (
            <div key={category}>
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                {label}
              </h4>
              <div className="space-y-1">
                {categoryExamples.map(example => (
                  <button
                    key={example.name}
                    onClick={() => onInsert(example.json)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors group"
                  >
                    <div className="text-sm text-gray-900 dark:text-gray-100 group-hover:text-primary">
                      {example.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {example.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

