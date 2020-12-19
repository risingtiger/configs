
syntax on
set hidden
set shortmess=a
set splitright
set mouse=a
set tabstop=2 softtabstop=2
set shiftwidth=2
set expandtab
set smartindent
set nu
set relativenumber
set signcolumn=number
set ruler
set nowrap
set smartcase
set foldmethod=syntax
set foldlevelstart=99
set noswapfile
set nobackup
set undodir=~/.config/nvim/undodir
set undofile
set incsearch
set updatetime=300
set shortmess+=c
set termguicolors
set background=dark

call plug#begin(stdpath('data') . '/plugged')
"Plug 'godlygeek/tabular'
"Plug 'tpope/vim-repeat'
"Plug 'mbbill/undotree'

Plug 'morhetz/gruvbox'

Plug 'jackguo380/vim-lsp-cxx-highlight'
Plug 'pangloss/vim-javascript'
Plug 'plasticboy/vim-markdown'

Plug 'preservim/nerdcommenter'
Plug 'tpope/vim-surround'
Plug 'mattn/emmet-vim'
Plug 'tpope/vim-fugitive'
Plug 'itchyny/lightline.vim'
Plug 'jiangmiao/auto-pairs'
Plug 'szw/vim-g'

Plug 'vifm/vifm.vim'
Plug 'junegunn/fzf.vim'
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'neoclide/coc.nvim', {'branch': 'release'}
call plug#end()

colorscheme gruvbox

let g:cpp_class_scope_highlight = 1
let g:cpp_member_variable_highlight = 1
let g:cpp_class_decl_highlight = 1
"let g:user_emmet_install_global = 0
"let g:user_emmet_leader_key='<Leader>,'
"autocmd FileType html,css EmmetInstall

let g:vim_g_command = "S"
let g:vifm_embed_split = 1

let mapleader = " "

noremap q :q<CR>

nnoremap <silent> <Leader>g :Google<CR>
nnoremap <silent> ff :vertical Vifm<CR>
nnoremap <silent> <Leader>f :Files<CR>
nnoremap <silent> <Leader>F :Files ~/<CR>
nnoremap <silent> <Leader>b :Buffers<CR>
nnoremap <silent> <Leader>s :Rg<CR>
nnoremap <silent> <Leader>n :noh<CR>
nnoremap <silent> <Leader>q :cnext<CR>
nnoremap <silent> <Leader>Q :cprevious<CR>
nnoremap <silent> <Leader>u :UndotreeToggle<CR>
nnoremap <silent> <Leader>h :e %:p:s,.h$,.X123X,:s,.cpp$,.h,:s,.X123X$,.cpp,<CR><CR>
nnoremap <silent> <Leader>j :set paste<CR>m`o<Esc>``:set nopaste<CR>
nnoremap <silent> <Leader>k :set paste<CR>m`O<Esc>``:set nopaste<CR>
nnoremap <silent> <Leader>J m`:silent +g/\m^\s*$/d<CR>``:noh<CR>
nnoremap <silent> <Leader>K m`:silent -g/\m^\s*$/d<CR>``:noh<CR>
nmap <silent> gr :Rg <C-r>=expand('<cword>')<CR><CR>
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nnoremap <silent> K :call <SID>show_documentation()<CR>

inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm()
                              \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

