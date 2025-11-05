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

