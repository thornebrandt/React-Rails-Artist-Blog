module ApplicationHelper
	def title(page_title = '')
		base_title = "React/Rails Artist Website"
		if page_title.empty?
			base_title
		else
			base_title + " | " + page_title
		end
	end

	def nav_link(link_text, link_path, type)
		class_name = current_page?(link_path) ? 'current' : nil		
		if defined?(@post) && @post.post_type == type
			class_name = 'current'
		end

		if defined?(@portfolio) && type == 'portfolio'
			class_name = 'current'
		end
		content_tag(:li, :class => class_name) do
			link_to link_text, link_path
		end
	end
end
