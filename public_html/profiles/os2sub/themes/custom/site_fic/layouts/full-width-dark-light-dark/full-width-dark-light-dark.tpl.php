<!-- full-width-dark-light-dark.tpl.php -->
<div <?php if (!empty($css_id)) {
    echo "id=\"$css_id\"";
} ?>>

  <?php if ($content['dark_section_1']): ?>
    <!-- Begin - dark section no. 1 -->
    <div class="os2-section os2-section-dark">
      <?php echo $content['dark_section_1']; ?>
    </div>
  </div>
  <!-- End - dark section no. 1 -->
  <?php endif; ?>

  <?php if ($content['light_section_1']): ?>
    <!-- Begin - light section no. 1 -->
    <div class="os2-section os2-section-light">
      <?php echo $content['light_section_1']; ?>
    </div>
  <!-- End - light section no. 1 -->
  <?php endif; ?>

  <?php if ($content['dark_section_2']): ?>
    <!-- Begin - dark section no. 2 -->
    <div class="os2-section os2-section-dark">
      <?php echo $content['dark_section_2']; ?>
    </div>
  <!-- End - dark section no. 2 -->
  <?php endif; ?>

</div>
