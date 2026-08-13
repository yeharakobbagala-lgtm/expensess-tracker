import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Edit2, Trash2, ArrowUpRight, ArrowDownLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';
import CategoryBadge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Modal from '../components/ui/Modal';
import TransactionForm from '../components/transactions/TransactionForm';
import { EmptyWalletIllustration } from '../components/illustrations/EmptyStateIllustrations';
import EmptyState from '../components/ui/EmptyState';

const PAGE_SIZE = 10;

export default function Transactions() {
  const { transactions, deleteTransaction, currency } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [editTx, setEditTx] = useState(null);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (search) list = list.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
    if (filterCat !== 'all') list = list.filter((t) => t.category === filterCat);
    if (filterType !== 'all') list = list.filter((t) => t.type === filterType);

    if (sortBy === 'date-desc') list.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sortBy === 'date-asc') list.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sortBy === 'amount-desc') list.sort((a, b) => b.amount - a.amount);
    else if (sortBy === 'amount-asc') list.sort((a, b) => a.amount - b.amount);
    return list;
  }, [transactions, search, filterCat, filterType, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-5 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans]">Transactions</h1>
          <p className="text-sm text-[#8a8a9a]">{filtered.length} transactions found</p>
        </div>
        <Button onClick={() => navigate('/transactions/add')}>
          <Plus size={15} />
          Add New
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0b1bb]" />
            <input
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8e9ef] text-sm text-[#1a1a2e] placeholder:text-[#b0b1bb] focus:outline-none focus:ring-2 focus:ring-[#f5c518] focus:border-transparent"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <select
            className="px-3 py-2.5 rounded-xl border border-[#e8e9ef] text-sm text-[#1a1a2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#f5c518] cursor-pointer"
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="px-3 py-2.5 rounded-xl border border-[#e8e9ef] text-sm text-[#1a1a2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#f5c518] cursor-pointer"
            value={filterCat}
            onChange={(e) => { setFilterCat(e.target.value); setPage(1); }}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <select
            className="px-3 py-2.5 rounded-xl border border-[#e8e9ef] text-sm text-[#1a1a2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#f5c518] cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm overflow-hidden">
        {paged.length === 0 ? (
          <EmptyState illustration={EmptyWalletIllustration} title="No transactions found" description="Try adjusting your search or filters to find what you're looking for." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f0f1f5] bg-[#fafafa]">
                    {['Transaction', 'Category', 'Type', 'Amount', 'Date', 'Method', ''].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-[#8a8a9a] uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paged.map((tx) => (
                    <tr key={tx.id} className="border-b border-[#f0f1f5] last:border-0 hover:bg-[#fafafa] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                            {tx.type === 'income'
                              ? <ArrowDownLeft size={14} className="text-emerald-600" />
                              : <ArrowUpRight size={14} className="text-red-500" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#1a1a2e]">{tx.title}</p>
                            {tx.notes && <p className="text-xs text-[#b0b1bb] mt-0.5 truncate max-w-36">{tx.notes}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4"><CategoryBadge categoryId={tx.category} /></td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium capitalize px-2.5 py-1 rounded-full ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-sm font-semibold ${tx.type === 'income' ? 'text-emerald-600' : 'text-[#1a1a2e]'}`}>
                          {tx.type === 'income' ? '+' : '-'}{currency} {tx.amount.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#8a8a9a] whitespace-nowrap">{tx.date}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs bg-[#f0f1f5] text-[#4a4a5a] px-2.5 py-1 rounded-full">{tx.method}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditTx(tx)} className="p-1.5 hover:bg-[#f0f1f5] rounded-lg text-[#8a8a9a] hover:text-[#1a1a2e] transition-colors">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => setDeleteId(tx.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-[#8a8a9a] hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#f0f1f5]">
                <p className="text-xs text-[#8a8a9a]">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    className="p-1.5 rounded-lg hover:bg-[#f0f1f5] text-[#4a4a5a] disabled:opacity-40 disabled:cursor-not-allowed">
                    <ChevronLeft size={15} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === p ? 'bg-[#f5c518] text-[#1a1a2e]' : 'hover:bg-[#f0f1f5] text-[#4a4a5a]'}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="p-1.5 rounded-lg hover:bg-[#f0f1f5] text-[#4a4a5a] disabled:opacity-40 disabled:cursor-not-allowed">
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteTransaction(deleteId)}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
      />

      <Modal isOpen={!!editTx} onClose={() => setEditTx(null)} title="Edit Transaction" size="md">
        {editTx && <TransactionForm initial={editTx} onSave={() => setEditTx(null)} onCancel={() => setEditTx(null)} />}
      </Modal>
    </div>
  );
}
