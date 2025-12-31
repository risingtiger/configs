
local abs_path = "/Users/dave/Code/"
local nifty_path = "nifty/"
local client_path = nifty_path .. "client/"
local client_overrides_path = "chrome_overrides/localhost:"
local client_subfolder = "assets/"




local append_data = function(_, data)
	data = table.concat(data, '\n')
	print(data)
end




local function trigger_copy_chrome_css_changes()

	local cmd = '/Users/dave/Code/niftybuild_run copy_chrome_css_changes '

	vim.fn.jobstart(cmd, {
		on_exit = function()
			vim.cmd('edit!')
			print("copy_chrome_css_changes done")
		end,
		on_stdout = append_data,
		on_stderr = append_data
	})
end


local function switch_component_file(file_extension)
	local current_file = vim.api.nvim_buf_get_name(0)

	-- Check if the file is in lazy/views or lazy/components directories
	if string.find(current_file, "lazy/views") or string.find(current_file, "lazy/components") then
		-- Get the file name without extension
		local basename = vim.fn.fnamemodify(current_file, ":r")
		local target_file = basename .. "." .. file_extension

		-- Open the corresponding file with the specified extension
		vim.cmd("edit " .. target_file)
	end
end



local function map(m, k, v)
	vim.keymap.set(m, k, v, { silent = true })
end

vim.opt.tabstop     = 4
vim.opt.expandtab   = false
vim.opt.softtabstop = 4
vim.opt.shiftwidth  = 4

vim.g.mapleader = " "
vim.g.maplocalleader = " "
vim.g.have_nerd_font = true

vim.opt.autoread = true

vim.opt.number = true
vim.opt.mouse = "a"

vim.opt.relativenumber = true

vim.opt.signcolumn = "yes"

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
vim.opt.undofile = true

vim.opt.updatetime = 250
vim.opt.timeoutlen = 300

vim.opt.list = true
vim.opt.listchars = { tab = "» ", trail = "·", nbsp = "␣" }

vim.opt.foldmethod = "indent"
vim.opt.foldtext = ""
vim.opt.foldlevel = 99
vim.opt.foldlevelstart = 99
vim.opt.foldnestmax = 4

vim.opt.title = false
vim.opt.wrap = false

-- Enable wrap for markdown files only
vim.api.nvim_create_autocmd("FileType", {
  pattern = "markdown",
  callback = function()
    vim.opt_local.wrap = true
  end,
})

vim.opt.cursorline = true

vim.opt.scrolloff = 2

vim.opt.incsearch = true

vim.opt.splitright = true
vim.opt.splitbelow = true

--vim.opt.termguicolors = true


vim.keymap.set("n", "<leader>t", "<cmd>tabn<CR>")
vim.keymap.set("n", "<leader>T", "<cmd>tabp<CR>")

vim.keymap.set("n", "<Esc>", "<cmd>nohlsearch<CR>")


vim.keymap.set("n", "<leader>q", vim.diagnostic.setloclist, { desc = "[Q]uickfix Open" })

vim.keymap.set("n", "<leader>w", "<cmd>cp<CR>")
vim.keymap.set("n", "<leader>e", "<cmd>cn<CR>")


vim.keymap.set("n", "<leader>aj", function() switch_component_file("ts") end, { desc = "Switch to component .ts file" })
vim.keymap.set("n", "<leader>ak", function() switch_component_file("html") end, { desc = "Switch to component .html file" })
vim.keymap.set("n", "<leader>al", function() switch_component_file("css") end, { desc = "Switch to component .css file" })
vim.keymap.set("n", "<leader>a;", function() vim.cmd("LspClangdSwitchSourceHeader") end, { desc = "Toggle C Header Files" })

vim.api.nvim_create_autocmd("FileType", {
  pattern = "*",
  callback = function()
    vim.opt_local.formatoptions:remove({ 'r', 'o' })
  end,
})



--[[
vim.keymap.set("n", "g<leader>", function()
	vim.cmd("wa")
end)

vim.keymap.set("n", "gm", function()
	vim.cmd("q")
end)
--]]

vim.keymap.set("n", "<leader>c", function()
	trigger_copy_chrome_css_changes()
end, { desc = "[C]ss update" })

map("x", "p", "P")



vim.keymap.set('i', '<C-J>', 'copilot#Accept("\\<CR>")', {
  expr = true,
  replace_keycodes = false
})
vim.g.copilot_no_tab_map = true


vim.keymap.set("n", "GF", function()
	vim.cmd("e .")
end, { desc = "[F]iles viewer" })

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
	local lazyrepo = "https://github.com/folke/lazy.nvim.git"
	local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
	if vim.v.shell_error ~= 0 then
		error("Error cloning lazy.nvim:\n" .. out)
	end
end ---@diagnostic disable-next-line: undefined-field
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({

	{
		"nvim-telescope/telescope.nvim",
		event = "VimEnter",
		branch = "0.1.x",
		dependencies = {
			"nvim-lua/plenary.nvim",
			{
				"nvim-telescope/telescope-fzf-native.nvim",
				build = "make",
			},
			{ "nvim-telescope/telescope-ui-select.nvim" },
			{ "nvim-tree/nvim-web-devicons", enabled = vim.g.have_nerd_font },
		},
		config = function()
			require("telescope").setup({
				extensions = {
					["ui-select"] = {
						require("telescope.themes").get_dropdown(),
					},
				},
			})

			pcall(require("telescope").load_extension, "fzf")
			pcall(require("telescope").load_extension, "ui-select")

			local builtin = require("telescope.builtin")
			vim.keymap.set("n", "gf", builtin.find_files, { desc = "[S]earch [F]iles" })
			vim.keymap.set("n", "GT", builtin.builtin, { desc = "[S]earch [S]elect Telescope" })
			vim.keymap.set("n", "gs", builtin.grep_string, { desc = "[S]earch current [W]ord" })
			-- vim.keymap.set("n", "gh", builtin.jumplist, { desc = "[S]earch [J]ump list" })
			vim.keymap.set("n", "GS", builtin.live_grep, { desc = "[S]earch by [G]rep" })
			vim.keymap.set("n", "<leader>d", vim.diagnostic.open_float, { desc = "[D]iagnostic line open float" })
			vim.keymap.set("n", "<leader>dd", builtin.diagnostics, { desc = "[D]iagnostics all" })
			--vim.keymap.set('n', '<leader>sr', builtin.resume, { desc = '[S]earch [R]esume' })
			--vim.keymap.set('n', '<leader>s.', builtin.oldfiles, { desc = '[S]earch Recent Files ("." for repeat)' })
			vim.keymap.set("n", "gh", builtin.buffers, { desc = "[ ] Find existing buffers" })

			vim.keymap.set("n", "<leader>s", function()
				-- You can pass additional configuration to Telescope to change the theme, layout, etc.
				builtin.current_buffer_fuzzy_find(require("telescope.themes").get_dropdown({
					winblend = 10,
					previewer = false,
				}))
			end, { desc = "[/] Fuzzily search in current buffer" })
		end,
	},

	{
		"neovim/nvim-lspconfig",
		dependencies = {
			{ "williamboman/mason.nvim", config = true },
			"williamboman/mason-lspconfig.nvim",
			"WhoIsSethDaniel/mason-tool-installer.nvim",
			--{ "jahui/fidget.nvim", opts = {} },
			"hrsh7th/cmp-nvim-lsp",
		},
		config = function()
			vim.api.nvim_create_autocmd("LspAttach", {
				group = vim.api.nvim_create_augroup("kickstart-lsp-attach", { clear = true }),
				callback = function(event)
					local map = function(keys, func, desc, mode)
						mode = mode or "n"
						vim.keymap.set(mode, keys, func, { buffer = event.buf, desc = "LSP: " .. desc })
					end

					map("gd", require("telescope.builtin").lsp_definitions, "[G]oto [D]efinition")
					map("gr", require("telescope.builtin").lsp_references, "[R]eferences")
					map('gt', require('telescope.builtin').lsp_type_definitions, 'Type [D]efinition')
					map("<leader>r", vim.lsp.buf.rename, "[R]ename")
				end,
			})

			local capabilities = vim.lsp.protocol.make_client_capabilities()
			capabilities = vim.tbl_deep_extend("force", capabilities, require("cmp_nvim_lsp").default_capabilities())

			local servers = {
				cssls = {},
				clangd = {},
				ts_ls = {},
				rust_analyzer = {},
				-- ... etc. See `:help lspconfig-all` for a list of all the pre-configured LSPs

				lua_ls = {
					-- cmd = {...},
					-- filetypes = { ...},
					-- capabilities = {},
					settings = {
						Lua = {
							completion = {
								callSnippet = "Replace",
							},
							-- You can toggle below to ignore Lua_LS's noisy `missing-fields` warnings
							-- diagnostics = { disable = { 'missing-fields' } },
						},
					},
				},
			}

			require("mason").setup()

			local ensure_installed = vim.tbl_keys(servers or {})
			vim.list_extend(ensure_installed, {
				"stylua", -- Used to format Lua code
			})
			require("mason-tool-installer").setup({ ensure_installed = ensure_installed })

			require("mason-lspconfig").setup({
				handlers = {
					function(server_name)
						local server = servers[server_name] or {}
						server.capabilities = vim.tbl_deep_extend("force", {}, capabilities, server.capabilities or {})
						require("lspconfig")[server_name].setup(server)
					end,
				},
			})
		end,
	},

	{
		"hrsh7th/nvim-cmp",
		event = "InsertEnter",
		dependencies = {
			{
				"L3MON4D3/LuaSnip",
				build = (function()
					if vim.fn.has("win32") == 1 or vim.fn.executable("make") == 0 then
						return
					end
					return "make install_jsregexp"
				end)(),
				dependencies = {},
			},
			"saadparwaiz1/cmp_luasnip",
			"hrsh7th/cmp-nvim-lsp",
			"hrsh7th/cmp-path",
		},
		config = function()
			local cmp = require("cmp")
			local luasnip = require("luasnip")
			luasnip.config.setup({})

			cmp.setup({
				snippet = {
					expand = function(args)
						luasnip.lsp_expand(args.body)
					end,
				},
				completion = { completeopt = "menu,menuone,noinsert" },

				mapping = cmp.mapping.preset.insert({
					["<C-n>"] = cmp.mapping.select_next_item(),
					["<C-p>"] = cmp.mapping.select_prev_item(),
					["<C-b>"] = cmp.mapping.scroll_docs(-4),
					["<C-f>"] = cmp.mapping.scroll_docs(4),
					["<C-y>"] = cmp.mapping.confirm({ select = true }),
					["<C-Space>"] = cmp.mapping.complete({}),
					["<C-l>"] = cmp.mapping(function()
						if luasnip.expand_or_locally_jumpable() then
							luasnip.expand_or_jump()
						end
					end, { "i", "s" }),
					["<C-h>"] = cmp.mapping(function()
						if luasnip.locally_jumpable(-1) then
							luasnip.jump(-1)
						end
					end, { "i", "s" }),
				}),
				sources = {
					--{ name = "copilot", group_index = 0 },
					{ name = "lazydev", group_index = 0 },
					{ name = "nvim_lsp" },
					{ name = "luasnip" },
					{ name = "path" },
					-- { name = "codeium" }
				},
			})
		end,
	},

	{
		"nvim-treesitter/nvim-treesitter",
		build = ":TSUpdate",
		main = "nvim-treesitter.configs", -- Sets main module to use for opts
		opts = {
			ensure_installed = {
				"bash",
				"c",
				"cpp",
				"css",
				"csv",
				"diff",
				"html",
				"javascript",
				"json",
				"lua",
				"luadoc",
				"markdown",
				"markdown_inline",
				"query",
				"rust",
				"vim",
				"vimdoc",
			},
			auto_install = true,
			highlight = {
				enable = true,
				additional_vim_regex_highlighting = { "ruby" },
			},
			indent = { enable = true, disable = { "ruby" } },
		},
	},

	{
		"ellisonleao/gruvbox.nvim",
		priority = 1000,
		init = function()
			vim.cmd.colorscheme("gruvbox")
			--vim.o.background = "light"
			vim.o.background = "dark"
			vim.cmd.hi("Comment gui=none")
		end,
	},

	{
		"folke/todo-comments.nvim",
		event = "InsertEnter",
		dependencies = { "nvim-lua/plenary.nvim" },
		opts = {
			signs = false,
			-- colors = {
			-- 	info = { "DiagnosticInfo", "#bfbfbf" },
			-- },
			highlight = {
				keyword = "fg", -- "fg", "bg", "wide", "wide_bg", "wide_fg" or empty. (wide and wide_bg is the same as bg, but will also highlight surrounding characters, wide_fg acts accordingly but with fg)
			},
		},
	},

	{
		"stevearc/aerial.nvim",
		keys = {
			{
				mode = "n",
				"g'",
				"<cmd>AerialToggle<CR>",
				desc = "[A]erial [T]oggle",
			},
		},
		config = function()
			require("aerial").setup({})
		end,
	},

	{
		"ThePrimeagen/harpoon",
		branch = "harpoon2",
		main = "harpoon",
		keys = {
			{
				"<leader>a",
				function()
					local harpoon = require("harpoon")
					harpoon:list():add()
				end,
				desc = "[H]arpoon [A]dd",
			},
			{
				"<leader>ah",
				function()
					local harpoon = require("harpoon")
					harpoon.ui:toggle_quick_menu(harpoon:list())
				end,
				desc = "[H]arpoon [L]ist",
			},
			{
				"<leader>au",
				function()
					local harpoon = require("harpoon")
					harpoon:list():select(1)
				end,
				desc = "[H]arpoon [S]elect 1",
			},
			{
				"<leader>ai",
				function()
					local harpoon = require("harpoon")
					harpoon:list():select(2)
				end,
				desc = "[H]arpoon [S]elect 2",
			},
			{
				"<leader>ao",
				function()
					local harpoon = require("harpoon")
					harpoon:list():select(3)
				end,
				desc = "[H]arpoon [S]elect 3",
			},
			{
				"<leader>ap",
				function()
					local harpoon = require("harpoon")
					harpoon:list():select(4)
				end,
				desc = "[H]arpoon [S]elect 4",
			},
			{
				"<leader>a[",
				function()
					local harpoon = require("harpoon")
					harpoon:list():select(0)
				end,
				desc = "[H]arpoon [S]elect 0",
			},
		},
		config = function()
			local harpoon = require("harpoon")
			harpoon.setup({})
		end,
	},


	{
		"sindrets/diffview.nvim",
		config = function()
			require('diffview').setup {
				keymaps = {
					view = {
					}
				},
			}
		end
	},

	{
		"echasnovski/mini.nvim",
		event = "InsertEnter",
		config = function()
			require("mini.ai").setup({ n_lines = 500 })
			require("mini.surround").setup()
			require("mini.pairs").setup()
			require('mini.align').setup()
			require("mini.comment").setup()
			require("mini.completion").setup()
			require("mini.splitjoin").setup()
			local statusline = require("mini.statusline")
			statusline.setup({ use_icons = vim.g.have_nerd_font })
			statusline.section_location = function()
				return "%2l:%-2v"
			end
		end,
	},

	{
		"mfussenegger/nvim-lint",
		keys = {
			{
				"<leader>pl",
				function()
					require("lint").try_lint()
				end,
				desc = "[L]int buffer",
			},
		},
		config = function()
			local lint = require("lint")

			lint.linters_by_ft = {
				javascript = { "eslint_d" },
				typescript = { "eslint_d" },
			}
		end,
	},

	{
		"stevearc/conform.nvim",
		keys = {
			{
				"<leader>pf",
				function() require("conform").format({ async = true }) end,
				mode = "n",
				desc = "[F]ormat buffer",
			},
		},

		opts = {
			formatters_by_ft = {
				lua = { "stylua" },
				javascript = { "prettier" },
				typescript = { "prettier" },
				css = { "prettier" },
				-- Conform can also run multiple formatters sequentially
				-- python = { "isort", "black" },
				--
			},
			default_format_opts = {
				lsp_format = "fallback",
			},
			formatters = {
				shfmt = {
					prepend_args = {"-i", "2"},
				},
			},
		},
		init = function()
			--vim.o.formatexpr = "v:lua.require'conform'.formatexpr()"
		end,
	},

	{
		'nvim-lualine/lualine.nvim',
		dependencies = { 'nvim-tree/nvim-web-devicons' },
		config = function()
			require('lualine').setup {
				sections = {
					lualine_x = {
						-- {
						-- 	require 'minuet.lualine',
						-- 	-- the follwing is the default configuration
						-- 	-- the name displayed in the lualine. Set to "provider", "model" or "both"
						-- 	display_name = 'model',
						-- 	-- separator between provider and model name for option "both"
						-- 	-- provider_model_separator = ':',
						-- 	-- whether show display_name when no completion requests are active
						-- 	display_on_idle = true,
						-- },
						'encoding',
						'fileformat',
						'filetype',
					},
				},
			}
		end
	},

	{
		"github/copilot.vim"
	},

	{
		"NickvanDyke/opencode.nvim",
		dependencies = {
			-- Recommended for `ask()` and `select()`.
			-- Required for `toggle()`.
			---@module 'snacks' <- Loads `snacks.nvim` types for configuration intellisense.
			{ "folke/snacks.nvim", opts = { input = {}, picker = {}, terminal = {} } },
		},
		config = function()
			vim.g.opencode_opts = {
			  -- Your configuration, if any — see `lua/opencode/config.lua`
			}

			-- Required for `vim.g.opencode_opts.auto_reload`
			vim.opt.autoread = true

			-- Recommended/example keymaps
			vim.keymap.set({ "n", "x" }, "<leader>oa", function() require("opencode").ask("@this: ", { submit = true }) end, { desc = "Ask about this" })
			vim.keymap.set({ "n", "x" }, "<leader>os", function() require("opencode").select() end, { desc = "Select prompt" })
			vim.keymap.set({ "n", "x" }, "<leader>o+", function() require("opencode").prompt("@this") end, { desc = "Add this" })
			vim.keymap.set("n", "<leader>ot", function() require("opencode").toggle() end, { desc = "Toggle embedded" })
			vim.keymap.set("n", "<leader>oc", function() require("opencode").command() end, { desc = "Select command" })
			vim.keymap.set("n", "<leader>on", function() require("opencode").command("session_new") end, { desc = "New session" })
			vim.keymap.set("n", "<leader>oi", function() require("opencode").command("session_interrupt") end, { desc = "Interrupt session" })
			vim.keymap.set("n", "<leader>oA", function() require("opencode").command("agent_cycle") end, { desc = "Cycle selected agent" })
			-- vim.keymap.set("n", "<S-C-u>",    function() require("opencode").command("messages_half_page_up") end, { desc = "Messages half page up" })
			-- vim.keymap.set("n", "<S-C-d>",    function() require("opencode").command("messages_half_page_down") end, { desc = "Messages half page down" })
		end,
	}

	--[[	
    {
        'milanglacier/minuet-ai.nvim',
        config = function()
            require('minuet').setup {
				provider = 'gemini',
				model = "gemini-2.0-flash",
				virtualtext = {
					auto_trigger_ft = { 'javascript', 'typescript', 'lua' },
					keymap = {
						-- accept whole completion
						accept = '<C-j>',
						-- accept one line
						-- accept_line = '<A-a>',
						-- accept n lines (prompts for number)
						-- e.g. "A-z 2 CR" will accept 2 lines
						-- accept_n_lines = '<A-z>',
						next = '<M-]>',
						prev = '<M-[>',
						dismiss = '<C-]>',
					},
				},
				presets = {
					openai = {
						provider = "openai",
						provider_options = {

							model = 'gpt-4.1-mini',
							chat_input = "See [Prompt Section for default value]",
							stream = true,
							api_key = 'OPENAI_API_KEY',
							optional = {
							-- pass any additional parameters you want to send to OpenAI request,
							-- e.g.
							-- stop = { 'end' },
							-- max_tokens = 256,
							-- top_p = 0.9,
							-- reasoning_effort = 'minimal'
							},
						}
					},
					gemini = {
						provider = 'gemini',
						context_window = 5000,
						provider_options = {
							gemini = {
								model = "gemini-2.0-flash",
								generationConfig = {
									maxOutputTokens = 256,
									thinkingConfig = {
										thinkingBudget = 0,
									},
								},
								safetySettings = {
									{
										category = 'HARM_CATEGORY_DANGEROUS_CONTENT',
										threshold = 'BLOCK_ONLY_HIGH',
									},
								},
							}
						}
					},
					sonnet = {
						provider = 'claude',
						context_window = 100000,
						request_timeout = 4,
						throttle = 4000,
						debounce = 2000,
						provider_options = {
							claude = {
								model = "claude-sonnet-4-20250514"
							}
						}
					}
				}
            }
        end,
    },
	--]]

	--[[
	{
		"zbirenbaum/copilot.lua",
		cmd = "Copilot",
		event = "InsertEnter",
		config = function()
			require("copilot").setup({
				copilot_model = "gpt-4o-copilot",
				suggestion = {
					enabled = true,
					auto_trigger = true,
					hide_during_completion = true,
					debounce = 75,
					trigger_on_accept = true,
					keymap = {
						accept = "<C-j>",
						accept_word = false,
						accept_line = false,
						next = "<M-]>",
						prev = "<M-[>",
						dismiss = "<C-]>",
					},
				},
			})
		end,
	},
	--]]
})





vim.api.nvim_create_autocmd("BufWritePost", {
	callback = function()

		local filepath = vim.api.nvim_buf_get_name(0)

		local instance_name = os.getenv("NIFTY_INSTANCE") or ""
		local niftyclient_dir = os.getenv("NIFTYCLIENT_DIR") or ""
		local niftyserver_dir = os.getenv("NIFTYSERVER_DIR") or ""

		local instance_client_dir = instance_name == "pwt" and ( os.getenv("NIFTY_INSTANCE_PWT_CLIENT_DIR") or "" ) or ( os.getenv("NIFTY_INSTANCE_XEN_CLIENT_DIR") or "" )
		local instance_server_dir = instance_name == "pwt" and ( os.getenv("NIFTY_INSTANCE_PWT_SERVER_DIR") or "" ) or ( os.getenv("NIFTY_INSTANCE_XEN_SERVER_DIR") or "" )

		local in_instance_client = string.find(filepath, instance_client_dir)
		local in_instance_server = string.find(filepath, instance_server_dir)
		local in_niftyclient = string.find(filepath, niftyclient_dir)
		local in_niftyserver = string.find(filepath, niftyserver_dir)

		if not (in_instance_client or in_instance_server or in_niftyclient or in_niftyserver) then
			return
		end


		local cmd = '/Users/dave/Code/niftybuild_run file ' .. filepath


		vim.fn.jobstart(cmd, {
			on_exit = function()
				print("build process done")
			end,
			on_stdout = append_data,
			on_stderr = append_data
		})
		--]]
	end
})











