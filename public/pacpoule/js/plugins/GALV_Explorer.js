#------------------------------------------------------------------------------#
#  Galv's Explorer's HUD
#------------------------------------------------------------------------------#
#  For: RPGMAKER VX ACE
#  Version 2.0
#------------------------------------------------------------------------------#
#  2013-01-31 - Version 2.0 - Fixed a bug with not drawing TP in battle option
#  2013-01-30 - Version 1.9 - Missed some things fixing the no actors crash
#  2013-01-24 - Version 1.8 - Fixed crash if no actors in party
#  2012-11-07 - Version 1.7 - some optimisation thanks to Niclas
#  2012-11-06 - Version 1.6 - more bug fixes
#  2012-11-06 - Version 1.5 - fixed so HUD doesn't appear in battle
#  2012-11-06 - Version 1.4 - added tp option and functionality
#  2012-11-06 - Version 1.3 - added options to disable windows
#  2012-11-06 - Version 1.2 - fixed map name bug not updating
#  2012-11-06 - Version 1.1 - changed z values of HUD
#  2012-11-06 - Version 1.0 - release
#------------------------------------------------------------------------------#
#  A HUD that displays information that might be useful for an RPG with a lot of
#  exploring. Can toggle it on or off when needed with a button. The info
#  displayed is the actor leading the party, so it works well with a script
#  such as Tsukihime's Rotate Formation to switch the lead actor with the press
#  of a button.
#------------------------------------------------------------------------------#
#  Visit: http://xtsukihime.wordpress.com/rmvxa-scripts/
#  To find latest versions of Tsukihime's scripts.
#------------------------------------------------------------------------------#
 
($imported ||= {})["Galv_Explorers_Hud"] = true
 
module Galvs_Hud
   
#------------------------------------------------------------------------------#
#  SCRIPT SETUP OPTIONS
#------------------------------------------------------------------------------#
 
  # GENERAL
   
  TOGGLE_SWITCH = 1       # Switch ID. When ON, hud is visible. When OFF its not
 
  ACTIVATE_BUTTON = :Z    # Button to toggle hud visibility switch. (:Z is "D")
                          # to disable make ACTIVATE_BUTTON = nil
                           
  HUD_SKIN = "Window"    # A windowskin to apply to the HUD. Located in
                          # /Graphics/System/
                          # Change to "Window" to use normal skin.
 
  SHOW_EQUIP = 0          # The equipment piece shown. This is the slot ID.
                          # 0 = weapon
                          # 1 = shield
                          # 2 = head
                          # 3 = body
                          # 4 = accessory
 
  SHOW_TP = true          # Show TP in top bar.
   
 
  # BOTTOM BAR
   
  SHOW_GOLD = true        # display gold in bottom bar
  SHOW_MAPNAME = true     # display map display name in bottom bar
  SHOW_COORDS = true      # display x,y coordinates in bottom bar
   
  REMOVE_WINDOWS = false  # This applies for above options that are set to false
                          # true = windows removed. false = windows blank
                           
 
#------------------------------------------------------------------------------#
#  SCRIPT SETUP OPTIONS
#------------------------------------------------------------------------------#
                           
end
 
class Scene_Map < Scene_Base
   
  alias galv_hud_create_spriteset create_spriteset
  def create_spriteset
    galv_hud_create_spriteset
    create_hud
  end
   
  alias galv_hud_update update
  def update
    galv_hud_update
    check_trigger
    update_hud if !@galv_hud.nil? && !scene_changing?
  end
   
  def update_hud
    @galv_hud.update
  end
   
  def create_hud
    @galv_hud = Galv_Hud.new(@viewport2)
  end  
   
  def check_trigger
    if Input.trigger?(Galvs_Hud::ACTIVATE_BUTTON)
      $game_switches[Galvs_Hud::TOGGLE_SWITCH] ^= true
    end
  end
   
  alias galv_hud_dispose_spriteset dispose_spriteset
  def dispose_spriteset
    galv_hud_dispose_spriteset
    @galv_hud.dispose
  end
   
end
 
 
class Galv_Hud < Scene_Base
 
  def initialize(viewport)
    super(viewport)
    create_gold_window
    create_coords_window
    create_location_window
    create_status_window
    $game_temp.hud_update[4] = []
    $game_temp.hud_update[6] = ""
    $game_temp.hud_update[7] = 0 #$game_party.members[0].tp
  end
 
  def create_status_window
    @status_window = Window_HudStatus.new
    @status_window.x = 0
    @status_window.y = 0
    @status_window.z = @status_window.z - 10
    @status_window.hide if !$game_switches[Galvs_Hud::TOGGLE_SWITCH]
  end
   
  def create_gold_window
    @gold_window = Window_QuickGold.new
    @gold_window.x = 0
    @gold_window.y = Graphics.height - @gold_window.height
    @gold_window.z = @gold_window.z - 10
    @gold_window.hide if !$game_switches[Galvs_Hud::TOGGLE_SWITCH]
  end
   
  def dispose
    @location_window.dispose
    @gold_window.dispose
    @status_window.dispose
    @coords_window.dispose
  end
   
  def create_coords_window
    @coords_window = Window_Coords.new
    @coords_window.x = Graphics.width - @coords_window.width
    @coords_window.y = Graphics.height - @coords_window.height
    @coords_window.z = @coords_window.z - 10
    @coords_window.hide if !$game_switches[Galvs_Hud::TOGGLE_SWITCH]
  end
   
  def create_location_window
    @location_window = Window_Location.new
    @location_window.x = @gold_window.width
    @location_window.y = Graphics.height - @location_window.height
    @location_window.z = @location_window.z - 10
    @location_window.hide if !$game_switches[Galvs_Hud::TOGGLE_SWITCH]
  end
   
  def update
    check_need_refresh
    hide_windows if !$game_switches[Galvs_Hud::TOGGLE_SWITCH]
    show_windows if $game_switches[Galvs_Hud::TOGGLE_SWITCH]
    @coords_window.refresh if Galvs_Hud::SHOW_COORDS
  end
   
  def check_need_refresh
    a = $game_party.members[0]
    return if a.nil?
    if $game_temp.hud_update != [a.id,a.hp,a.mp,a.exp,a.state_icons,$game_party.gold,$game_map.display_name,a.tp]
      refresh_windows
    else
      return
    end
  end
   
  def refresh_windows
      @status_window.refresh
      @gold_window.refresh
      @location_window.refresh
      $game_temp.hud_update[5] = $game_party.gold
  end
   
  def hide_windows
    if @status_window.visible
      @gold_window.hide
      @location_window.hide
      @coords_window.hide
      @status_window.hide
    end
  end
   
  def show_windows
    if !@status_window.visible
      @gold_window.show
      @location_window.show
      @coords_window.show
      @status_window.show
    end
  end
 
end # Galv_Hud
 
 
class Window_Location < Window_Base
 
  def initialize
    super(0, 0, window_width, fitting_height(1))
    self.openness = 255
    self.windowskin = Cache.system(Galvs_Hud::HUD_SKIN)
    self.opacity = 0 if !Galvs_Hud::SHOW_MAPNAME && Galvs_Hud::REMOVE_WINDOWS
    refresh
  end
 
  def window_width
    return (Graphics.width - 130 - 130)
  end
 
  def refresh
    $game_temp.hud_update[6] = $game_map.display_name
    return if !Galvs_Hud::SHOW_MAPNAME
    contents.clear
    draw_text((contents.width / 2) - ((locate_text.length * 10) / 2), 0, Graphics.width / 2, line_height, locate_text)
     
  end
   
  def locate_text
    $game_map.display_name
  end
  
  def open
    refresh
    super
  end
 
end # Window_Location < Window_Base
 
 
class Window_Coords < Window_Base
 
  def initialize
    super(0, 0, window_width, fitting_height(1))
    self.openness = 255
    self.windowskin = Cache.system(Galvs_Hud::HUD_SKIN)
    self.opacity = 0 if !Galvs_Hud::SHOW_COORDS && Galvs_Hud::REMOVE_WINDOWS
    refresh
  end
 
  def window_width
    return 130
  end
 
  def refresh
    return if !Galvs_Hud::SHOW_COORDS
    contents.clear
    change_color(normal_color)
    draw_text(15, 0, contents.width, line_height, $game_player.x.to_s)
    draw_text(70, 0, contents.width, line_height, $game_player.y.to_s)
    change_color(system_color)
    draw_text(0, 0, window_width, line_height, "X")
    draw_text(55, 0, window_width, line_height, "Y")
  end
 
  def open
    refresh
    super
  end
   
end # Window_Coords < Window_Base
 
 
class Window_QuickGold < Window_Base
 
  def initialize
    super(0, 0, window_width, fitting_height(1))
    self.openness = 255
    self.windowskin = Cache.system(Galvs_Hud::HUD_SKIN)
    self.opacity = 0 if !Galvs_Hud::SHOW_GOLD && Galvs_Hud::REMOVE_WINDOWS
    refresh
  end
 
  def window_width
    return 130
  end
 
  def refresh
    return if !Galvs_Hud::SHOW_GOLD
    contents.clear
    draw_currency_value(value, currency_unit, 4, 0, contents.width - 8)
  end
 
  def value
    $game_party.gold
  end
 
  def currency_unit
    Vocab::currency_unit
  end
 
  def open
    refresh
    super
  end
   
end # Window_QuickGold < Window_Base
 
 
class Window_HudStatus < Window_Selectable
  def initialize
    super(0, 0, window_width, window_height)
    refresh if $game_party.leader
    self.openness = 255
    self.windowskin = Cache.system(Galvs_Hud::HUD_SKIN)
  end
   
  def window_width
    Graphics.width
  end
   
  def window_height
    fitting_height(visible_line_number)
  end
 
  def visible_line_number
    return 2
  end
 
  def item_max
    1
  end
   
  def refresh
    contents.clear
    draw_item(0)
    draw_equips($game_party.members[0].equips[Galvs_Hud::SHOW_EQUIP].id) unless $game_party.members[0].equips[Galvs_Hud::SHOW_EQUIP].nil?
  end
 
  def draw_item(index)
    actor = $game_party.battle_members[index]
    draw_basic_area(basic_area_rect(index), actor)
    draw_gauge_area(gauge_area_rect(index), actor)
    draw_face(actor.face_name, actor.face_index, x, y - 30, actor.hp > 0)
    draw_actor_level(actor, Graphics.width - 90, y + line_height * 1)
    $game_temp.hud_update[0] = $game_party.members[0].id
  end
   
  def draw_equips(index)
    if Galvs_Hud::SHOW_EQUIP <= 0
      item = $data_weapons[index]
    else
      item = $data_armors[index]
    end
    if item
      rect = item_rect(1)
      rect.width -= 4
      draw_item_name(item, rect.x + 100, rect.y, $game_party.members[0].hp > 0)
    end
  end
   
  def basic_area_rect(index)
    rect = item_rect_for_text(index)
    rect.width -= gauge_area_width + 10
    rect
  end
 
  def gauge_area_rect(index)
    rect = item_rect_for_text(index)
    rect.x += rect.width - gauge_area_width
    rect.width = gauge_area_width
    rect
  end
 
  def gauge_area_width
    return 220
  end
 
  def draw_basic_area(rect, actor)
    draw_actor_icons(actor, rect.x + 104, rect.y, rect.width - 104)
    $game_temp.hud_update[4] = $game_party.members[0].state_icons
  end
 
  def draw_gauge_area(rect, actor)
    if $data_system.opt_display_tp
      draw_gauge_area_with_tp(rect, actor)
    else
      draw_gauge_area_without_tp(rect, actor)
    end
  end
 
  def draw_gauge_area_with_tp(rect, actor)
    draw_actor_hp(actor, rect.x - 60, rect.y, 132)
    draw_actor_tp(actor, rect.x + 82, rect.y + 25, 64) unless !Galvs_Hud::SHOW_TP
    draw_actor_mp(actor, rect.x + 82, rect.y, 64)
    draw_actor_xp(actor, rect.x + 156, rect.y, 64)
    $game_temp.hud_update[1] = $game_party.members[0].hp
    $game_temp.hud_update[2] = $game_party.members[0].mp
    $game_temp.hud_update[3] = $game_party.members[0].exp
    $game_temp.hud_update[7] = $game_party.members[0].tp
  end
   
  def draw_gauge_area_without_tp(rect, actor)
    draw_actor_hp(actor, rect.x - 60, rect.y, 132)
    draw_actor_mp(actor, rect.x + 82, rect.y, 64)
    draw_actor_xp(actor, rect.x + 156, rect.y, 64)
    $game_temp.hud_update[1] = $game_party.members[0].hp
    $game_temp.hud_update[2] = $game_party.members[0].mp
    $game_temp.hud_update[3] = $game_party.members[0].exp
    $game_temp.hud_update[7] = $game_party.members[0].tp
  end
 
  def draw_actor_xp(actor, x, y, width = 124)
    draw_gauge(x, y, width, (actor.exp.to_f - actor.class.exp_for_level(actor.level)) / (actor.class.exp_for_level(actor.level + 1) - actor.class.exp_for_level(actor.level)), text_color(6), text_color(14))
    change_color(system_color)
    draw_text(x, y, 30, line_height, "EXP")
  end
   
end # Window_HudStatus < Window_Selectable
 
 
 
class Sprite_Timer < Sprite
   
  alias galv_hud_update_position update_position
  def update_position
    galv_hud_update_position
    self.y = 70 if $game_switches[Galvs_Hud::TOGGLE_SWITCH]
  end
end # Sprite_Timer < Sprite
 
 
class Window_MapName < Window_Base
   
  alias galv_hud_update update
  def update
    galv_hud_update
    update_position if $game_map.name_display
  end
   
  def update_position
    if $game_switches[Galvs_Hud::TOGGLE_SWITCH]
      self.y = 70
    else
      self.y = 0
    end
  end
   
end # Window_MapName < Window_Base
 
 
class Game_Temp
  attr_accessor :hud_update
   
  alias galv_hud_initialize initialize
  def initialize
    galv_hud_initialize
    @hud_update = []
  end
   
end # Game_Temp